import { Injectable } from '@nestjs/common';
import { Prisma } from '../generated/prisma/client.js';
import { CreateRicercaDto } from './dto/create-ricerca.dto.js';
import { ResponseRicercaDto } from './dto/response-ricerca.dto.js';
import { RicercaSelectParamsDto } from './dto/ricerca-select-params.dto.js';
import { RicercaWhereParamsDto } from './dto/ricerca-where-params.dto.js';
import { RicercaFindAllParamsDto } from './ricerca.controller.js';

export type DeepPartial<T> =
  T extends readonly (infer U)[] ? readonly DeepPartial<U>[] :
  T extends object ? { [K in keyof T]?: DeepPartial<T[K]> } :
  T;

type RicercaFull = Prisma.RicercaGetPayload<{
  include: {
    interviste: true;
    selezionati: true;
  };
}>;

@Injectable()
export class RicercaMapper {
  modelToDto(
    ricerca: DeepPartial<RicercaFull>,
  ): DeepPartial<ResponseRicercaDto> {
    const { interviste, selezionati, ...rest } = ricerca;

    return {
      ...rest,
    };
  }

  createDtoToModel(dto: CreateRicercaDto): Prisma.RicercaCreateInput {
    return structuredClone(dto);
  }

  updateDtoToModel(dto: Partial<CreateRicercaDto>): Prisma.RicercaUpdateInput {
    return structuredClone(dto);
  }

  selectParamsDtoToModel(params: RicercaSelectParamsDto): Prisma.RicercaSelect {
    const { exclude, fullRelations } = params;

    return {
      id: !exclude?.includes('id'),
      descrizione: !exclude?.includes('descrizione'),
      stato: !exclude?.includes('stato'),
      ...(!exclude?.includes('interviste') && {
        interviste: fullRelations ? true : { select: { id: true } },
      }),
      ...(!exclude?.includes('selezionati') && {
        selezionati: fullRelations ? true : { select: { id: true } },
      }),
    };
  }

  whereParamsDtoToModel(params: RicercaWhereParamsDto) {
    const { id, stato, interviste, selezionati } = params;

    return {
      AND: [
        { id: id ? { in: id } : undefined },
        { stato: stato ? { in: stato } : undefined },
        {
          interviste: interviste
            ? { some: { id: { in: interviste } } }
            : undefined,
        },
        {
          selezionati: selezionati
            ? { some: { id: { in: selezionati } } }
            : undefined,
        },
      ],
    };
  }

  allParamsDtoToModel(
    params: RicercaFindAllParamsDto,
  ): Prisma.RicercaFindManyArgs {
    const {
      id,
      stato,
      interviste,
      selezionati,
      exclude,
      fullRelations,
      ...rest
    } = params;

    return {
      ...rest,
      select: this.selectParamsDtoToModel({ exclude, fullRelations }),
      where: this.whereParamsDtoToModel({
        id,
        stato,
        interviste,
        selezionati,
      }),
    };
  }
}
