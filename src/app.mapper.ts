import { Injectable } from '@nestjs/common';
import { Prisma } from './generated/prisma/client.js';
import { IntervistaMapper } from './intervista/intervista.mapper.js';
import { ResponseIntervistaDto } from './intervista/dto/response-intervista.dto.js';
import { ResponseRicercaDto } from './ricerca/dto/response-ricerca.dto.js';
import { RicercaMapper } from './ricerca/ricerca.mapper.js';
import { ResponseUtenteDto } from './utente/dto/response-utente.dto.js';
import { UtenteMapper } from './utente/utente.mapper.js';

export type DeepPartial<T> =
  T extends readonly (infer U)[] ? readonly DeepPartial<U>[] :
  T extends object ? { [K in keyof T]?: DeepPartial<T[K]> } :
  T;

type IntervistaFull = Prisma.IntervistaGetPayload<{
  include: {
    candidato: true;
    intervistatori: true;
    ricerca: true;
  };
}>;

type UtenteFull = Prisma.UtenteGetPayload<{
  include: {
    intervisteRicevute: true;
    intervisteEffettuate: true;
    selezionatoIn: true;
  };
}>;

type RicercaFull = Prisma.RicercaGetPayload<{
  include: {
    interviste: true;
    selezionati: true;
  };
}>;

@Injectable()
export class AppMapper {
  constructor(
    private readonly intervistaMapper: IntervistaMapper,
    private readonly utenteMapper: UtenteMapper,
    private readonly ricercaMapper: RicercaMapper,
  ) {}

  mapIntervista(
    intervista: DeepPartial<IntervistaFull>,
  ): DeepPartial<ResponseIntervistaDto> {
    const mapped = this.mapIntervistaRelation(intervista);
    return typeof mapped === 'number' ? { id: mapped } : mapped;
  }

  private mapIntervistaRelation(
    intervista: DeepPartial<IntervistaFull>,
  ): DeepPartial<ResponseIntervistaDto> | number {
    if (this.isIdOnly(intervista)) return intervista.id;

    const { candidato, intervistatori, ricerca, ...rest } = intervista;
    return {
      ...this.intervistaMapper.modelToDto(rest),
      ...(candidato && { candidato: this.mapUtenteRelation(candidato) }),
      ...(intervistatori && {
        intervistatori: intervistatori.map((utente) =>
          this.mapUtenteRelation(utente),
        ),
      }),
      ...(ricerca && { ricerca: this.mapRicercaRelation(ricerca) }),
    };
  }

  mapUtente(
    utente: DeepPartial<UtenteFull>,
  ): DeepPartial<ResponseUtenteDto> {
    const mapped = this.mapUtenteRelation(utente);
    return typeof mapped === 'number' ? { id: mapped } : mapped;
  }

  private mapUtenteRelation(
    utente: DeepPartial<UtenteFull>,
  ): DeepPartial<ResponseUtenteDto> | number {
    if (this.isIdOnly(utente)) return utente.id;

    const {
      intervisteRicevute,
      intervisteEffettuate,
      selezionatoIn,
      ...rest
    } = utente;
    return {
      ...this.utenteMapper.modelToDto(rest),
      ...(intervisteRicevute && {
        intervisteRicevute: intervisteRicevute.map((intervista) =>
          this.mapIntervistaRelation(intervista),
        ),
      }),
      ...(intervisteEffettuate && {
        intervisteEffettuate: intervisteEffettuate.map((intervista) =>
          this.mapIntervistaRelation(intervista),
        ),
      }),
      ...(selezionatoIn && {
        selezionatoIn: this.mapRicercaRelation(selezionatoIn),
      }),
    };
  }

  mapRicerca(
    ricerca: DeepPartial<RicercaFull>,
  ): DeepPartial<ResponseRicercaDto> {
    const mapped = this.mapRicercaRelation(ricerca);
    return typeof mapped === 'number' ? { id: mapped } : mapped;
  }

  private mapRicercaRelation(
    ricerca: DeepPartial<RicercaFull>,
  ): DeepPartial<ResponseRicercaDto> | number {
    if (this.isIdOnly(ricerca)) return ricerca.id;

    const { interviste, selezionati, ...rest } = ricerca;
    return {
      ...this.ricercaMapper.modelToDto(rest),
      ...(interviste && {
        interviste: interviste.map((intervista) =>
          this.mapIntervistaRelation(intervista),
        ),
      }),
      ...(selezionati && {
        selezionati: selezionati.map((utente) =>
          this.mapUtenteRelation(utente),
        ),
      }),
    };
  }

  private isIdOnly(value: { id?: unknown }): value is { id: number } {
    return (
      Object.keys(value).length === 1 &&
      typeof value.id === 'number'
    );
  }
}
