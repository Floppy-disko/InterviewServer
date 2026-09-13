import { Injectable } from '@nestjs/common';
import { Intervista, Prisma } from '../generated/prisma/client.js';
import { CreateIntervistaDto } from './dto/create-intervista.dto';
import { ResponseIntervistaDto } from './dto/response-intervista.dto';

type IntervistaFull = Prisma.IntervistaGetPayload<{
  include: {
    candidato: true;
    intervistatori: true;
    ricerca: true;
  };
}>;

@Injectable()
export class IntervistaMapper {
  modelToResponseDto(intervista: IntervistaFull): ResponseIntervistaDto {
    const { candidato, intervistatori, ricerca, ...rest } = intervista;

    return {
      ...rest,
      candidato: {
        id: candidato.id,
        nome: candidato.nome,
        cognome: candidato.cognome,
      },
      intervistatori: intervistatori.map((intervistatore) => ({
        id: intervistatore.id,
        nome: intervistatore.nome,
        cognome: intervistatore.cognome,
      })),
      ricerca: ricerca.id,
    };
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
}
