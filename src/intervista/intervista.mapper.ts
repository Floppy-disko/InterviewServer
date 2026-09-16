import { Injectable } from '@nestjs/common';
import { Intervista, Prisma } from '../generated/prisma/client';
import { CreateIntervistaDto } from './dto/create-intervista.dto';
import { ResponseIntervistaDto } from './dto/response-intervista.dto';
import { IntervistaListParamsDto } from './dto/intervista-list-params.dto';

//tipo ritornato da create quando includo le relazioni
type IntervistaFull = Prisma.IntervistaGetPayload<{
  include: {
    candidato: true;
    intervistatori: true;
    ricerca: true;
  };
}>;

@Injectable()
export class IntervistaMapper {

  modelToDto(intervista: IntervistaFull): ResponseIntervistaDto {
    const dto: ResponseIntervistaDto = {
      id: intervista.id,
      stato: intervista.stato,
      inizio: intervista.inizio,
      fine: intervista.fine,
      candidato: {
        id: intervista.candidato.id,
        nome: intervista.candidato.nome,
        cognome: intervista.candidato.cognome,
      },
      intervistatori: intervista.intervistatori.map((intervistatore) => ({
        id: intervistatore.id,
        nome: intervistatore.nome,
        cognome: intervistatore.cognome,
      })),
      ricerca: intervista.ricerca.id,
    };

    return dto;
  }

  modelToPartialDto(intervista: Partial<IntervistaFull>): Partial<ResponseIntervistaDto> {
    const dto: Partial<ResponseIntervistaDto> = {};

    if (intervista.id != null) dto.id = intervista.id;
    if (intervista.stato != null) dto.stato = intervista.stato;
    if (intervista.inizio != null) dto.inizio = intervista.inizio;
    if (intervista.fine != null) dto.fine = intervista.fine;

    if (intervista.candidato != null) {
      dto.candidato = {
        id: intervista.candidato.id,
        nome: intervista.candidato.nome,
        cognome: intervista.candidato.cognome,
      };
    }

    if (intervista.intervistatori != null) {
      dto.intervistatori = intervista.intervistatori.map((intervistatore) => ({
        id: intervistatore.id,
        nome: intervistatore.nome,
        cognome: intervistatore.cognome,
      }));
    }

    if (intervista.ricerca != null) {
      dto.ricerca = intervista.ricerca.id;
    }

    return dto;
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
        candidato: !exclude?.includes('candidato'),
        intervistatori: !exclude?.includes('intervistatori'),
        ricerca: !exclude?.includes('ricerca'),
      },
      where: {
        AND: [
          { id: id ? { in: id } : undefined },
          { inizio: after ? { gt: after }: undefined },
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

  updateDtoToModel(dto: Partial<CreateIntervistaDto>): Prisma.IntervistaUpdateInput {
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
