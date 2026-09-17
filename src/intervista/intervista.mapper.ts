import { Injectable } from '@nestjs/common';
import { Prisma } from '../generated/prisma/client.js';
import { CreateIntervistaDto } from './dto/create-intervista.dto.js';
import { ResponseIntervistaDto } from './dto/response-intervista.dto.js';
import { IntervistaListParamsDto } from './dto/intervista-list-params.dto.js';
import { IntervistaForMapping } from './intervista.select.js';
import { intervistaSelect } from './intervista.select.js';

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

  listParamsDtoToModel(params: IntervistaListParamsDto) {
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

    return {
      ...rest,
      select: {
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
      },
      where: {
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
      },
    };
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
