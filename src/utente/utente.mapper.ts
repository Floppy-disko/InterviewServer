import { Injectable } from '@nestjs/common';
import { Prisma, Utente } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma.service.js';
import { CreateUtenteDto } from './dto/create-utente.dto.js';
import { ResponseUtenteDto } from './dto/response-utente.dto.js';
import { UtenteListParamsDto } from './dto/utente-list-params.dto.js';

@Injectable()
export class UtenteMapper {

  modelToDto(utente: Utente): ResponseUtenteDto {
    const dto: ResponseUtenteDto = {
      id: utente.id,
      nome: utente.nome,
      cognome: utente.cognome,
      email: utente.email,
    };
    if (utente.ruolo != null) dto.ruolo = utente.ruolo;
    return dto;
  }

  modelToPartialDto(utente: Partial<Utente>): Partial<ResponseUtenteDto> {
    const dto: Partial<ResponseUtenteDto> = {};

    if (utente.id != null) dto.id = utente.id;
    if (utente.nome != null) dto.nome = utente.nome;
    if (utente.cognome != null) dto.cognome = utente.cognome;
    if (utente.email != null) dto.email = utente.email;
    if (utente.ruolo != null) dto.ruolo = utente.ruolo;

    return dto;
  }

  updateDtoToModel(dto: Partial<CreateUtenteDto>): Prisma.UtenteUpdateInput {
    const model: Partial<Prisma.UtenteCreateInput> = {};

    if (dto.nome != null) model.nome = dto.nome;
    if (dto.cognome != null) model.cognome = dto.cognome;
    if (dto.email != null) model.email = dto.email;
    if (dto.ruolo != null) model.ruolo = dto.ruolo;

    return model;
  }

  createDtoToModel(dto: CreateUtenteDto): Prisma.UtenteCreateInput {
    return dto;
  }

  listParamsDtoToModel(params: UtenteListParamsDto) {
    const { id, nome, cognome, email, ruolo, exclude, ...rest } = params;

    return {
      ...rest,
      select: {
        id: !exclude?.includes('id'),
        nome: !exclude?.includes('nome'),
        cognome: !exclude?.includes('cognome'),
        email: !exclude?.includes('email'),
        ruolo: !exclude?.includes('ruolo'),
      },
      where: {
        AND: [
          { id: id ? { in: id } : undefined },
          { nome: nome ? { in: nome } : undefined },
          { cognome: cognome ? { in: cognome } : undefined },
          { email: email ? { in: email } : undefined },
          { ruolo: ruolo ? { in: ruolo } : undefined },
        ],
      },
    };
  }
}
