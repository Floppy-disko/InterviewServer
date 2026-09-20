import { Injectable } from '@nestjs/common';
import { Prisma, Utente } from '../generated/prisma/client.js';
import { CreateUtenteDto } from './dto/create-utente.dto.js';
import { ResponseUtenteDto } from './dto/response-utente.dto.js';
import { UtenteSelectParamsDto } from './dto/utente-select-params.dto.js';
import { UtenteWhereParamsDto } from './dto/utente-where-params.dto.js';
import { UtenteFindAllParamsDto } from './utente.controller.js';

export type DeepPartial<T> =
  T extends readonly (infer U)[] ? readonly DeepPartial<U>[] :
  T extends object ? { [K in keyof T]?: DeepPartial<T[K]> } :
  T;

type UtenteFull = Prisma.UtenteGetPayload<{
  include: {
    intervisteRicevute: true;
    intervisteEffettuate: true;
    selezionatoIn: true;
  };
}>;

@Injectable()
export class UtenteMapper {
  modelToDto(
    utente: DeepPartial<UtenteFull>,
  ): DeepPartial<ResponseUtenteDto> {
    const {
      intervisteRicevute,
      intervisteEffettuate,
      selezionatoIn,
      ruolo,
      ...rest
    } = utente;

    return {
      ...rest,
      ...(ruolo && { ruolo }),
    };
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
    return structuredClone(dto);
  }

  selectParamsDtoToModel(params: UtenteSelectParamsDto): Prisma.UtenteSelect {
    const { exclude, fullRelations } = params;

    return {
      id: !exclude?.includes('id'),
      nome: !exclude?.includes('nome'),
      cognome: !exclude?.includes('cognome'),
      email: !exclude?.includes('email'),
      ruolo: !exclude?.includes('ruolo'),
      ...(!exclude?.includes('intervisteRicevute') && {
        intervisteRicevute: fullRelations ? true : { select: { id: true } },
      }),
      ...(!exclude?.includes('intervisteEffettuate') && {
        intervisteEffettuate: fullRelations ? true : { select: { id: true } },
      }),
      ...(!exclude?.includes('selezionatoIn') && {
        selezionatoIn: fullRelations ? true : { select: { id: true } },
      }),
    };
  }

  whereParamsDtoToModel(params: UtenteWhereParamsDto) {
    const {
      id,
      nome,
      cognome,
      email,
      ruolo,
      intervisteRicevute,
      intervisteEffettuate,
      selezionatoIn,
    } = params;

    return {
      AND: [
        { id: id ? { in: id } : undefined },
        { nome: nome ? { in: nome } : undefined },
        { cognome: cognome ? { in: cognome } : undefined },
        { email: email ? { in: email } : undefined },
        { ruolo: ruolo ? { in: ruolo } : undefined },
        {
          intervisteRicevute: intervisteRicevute
            ? { some: { id: { in: intervisteRicevute } } }
            : undefined,
        },
        {
          intervisteEffettuate: intervisteEffettuate
            ? { some: { id: { in: intervisteEffettuate } } }
            : undefined,
        },
        {
          selezionatoIn: selezionatoIn
            ? { id: { in: selezionatoIn } }
            : undefined,
        },
      ],
    };
  }

  allParamsDtoToModel(
    params: UtenteFindAllParamsDto,
  ): Prisma.UtenteFindManyArgs {
    const {
      id,
      nome,
      cognome,
      email,
      ruolo,
      intervisteRicevute,
      intervisteEffettuate,
      selezionatoIn,
      exclude,
      fullRelations,
      ...rest
    } = params;

    return {
      ...rest,
      select: this.selectParamsDtoToModel({ exclude, fullRelations }),
      where: this.whereParamsDtoToModel({
        id,
        nome,
        cognome,
        email,
        ruolo,
        intervisteRicevute,
        intervisteEffettuate,
        selezionatoIn,
      }),
    };
  }
}
