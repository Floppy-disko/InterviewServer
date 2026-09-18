import { Injectable } from '@nestjs/common';
import { Prisma } from '../generated/prisma/client.js';
import { CreateIntervistaDto } from './dto/create-intervista.dto.js';
import { ResponseIntervistaDto } from './dto/response-intervista.dto.js';
import { IntervistaSelectParamsDto } from './dto/intervista-select-params.dto.js';
import { IntervistaWhereParamsDto } from './dto/Intervista-where-params.dto.js';
import { IntervistaForMapping } from './intervista.select.js';
import { intervistaSelect } from './intervista.select.js';
import { IntervistaFindAllParamsDto } from './intervista.controller.js';

@Injectable()
export class IntervistaMapper {

  modelToDto(intervista: IntervistaForMapping): ResponseIntervistaDto {
    return structuredClone(intervista);
  }

  modelToPartialDto(
    intervista: Partial<IntervistaForMapping>,
  ): Partial<ResponseIntervistaDto> {
    return structuredClone(intervista);
  }

  /**
   * Converte un DTO di creazione in un modello per la creazione di un'intervista
   * in cui gli utenti e la ricerca sono pre esitenti
   * @param dto Dati di input per la creazione dell'intervista nel formato accettato dall'api
   * @returns Modello per la creazione dell'intervista
   */
  createDtoToModel(dto: CreateIntervistaDto): Prisma.IntervistaCreateInput {
    const { candidato, intervistatori, ricerca, ...rest } = dto;

    return {
      ...rest,
      candidato: { connect: { id: candidato } },
      intervistatori: {
        connect: intervistatori.map((id) => ({ id })),
      },
      ricerca: { connect: { id: ricerca } },
    };
  }

  selectParamsDtoToModel(params: IntervistaSelectParamsDto) {
    const { exclude } = params;

    return {
      id: !exclude?.includes('id'),
      inizio: !exclude?.includes('inizio'),
      fine: !exclude?.includes('fine'),
      stato: !exclude?.includes('stato'),

      candidato: exclude?.includes('candidato')
        ? false
        : intervistaSelect.candidato,

      intervistatori: exclude?.includes('intervistatori')
        ? false
        : intervistaSelect.intervistatori,

      ricerca: exclude?.includes('ricerca')
        ? false
        : intervistaSelect.ricerca,
    };
  }

  whereParamsDtoToModel(params: IntervistaWhereParamsDto) {
    const {
      id,
      before,
      after,
      stato,
      candidato,
      intervistatori,
      ricerca,
    } = params;

    return {
      AND: [
        { id: id ? { in: id } : undefined },
        { inizio: after ? { gt: after } : undefined },
        { fine: before ? { lt: before } : undefined },
        { stato: stato ? { in: stato } : undefined },
        {
          candidato: candidato ? { id: { in: candidato } } : undefined,
        },
        {
          intervistatori: intervistatori
            ? { some: { id: { in: intervistatori } } }
            : undefined,
        },
        { ricerca: ricerca ? { id: { in: ricerca } } : undefined },
      ],
    };
  }

  allParamsDtoToModel(
    params: IntervistaFindAllParamsDto,
  ): Prisma.IntervistaFindManyArgs {
    const {
      id,
      before,
      after,
      stato,
      candidato,
      intervistatori,
      ricerca,
      exclude,
      ...rest
    } = params;

    const select = this.selectParamsDtoToModel({ exclude });
    const where = this.whereParamsDtoToModel({
      id,
      before,
      after,
      stato,
      candidato,
      intervistatori,
      ricerca,
    });

    return {
      ...rest,
      select,
      where,
    }
  }

  updateDtoToModel(
    dto: Partial<CreateIntervistaDto>,
  ): Prisma.IntervistaUpdateInput {
    const { candidato, intervistatori, ricerca, ...rest } = dto;

    const model: Prisma.IntervistaUpdateInput = {
      ...rest,
    };

    if (candidato != null) {
      model.candidato = { connect: { id: candidato } };
    }

    if (intervistatori != null) {
      model.intervistatori = {
        set: intervistatori.map((id) => ({ id })),
      };
    }

    if (ricerca != null) {
      model.ricerca = { connect: { id: ricerca } };
    }

    return model;
  }
}
