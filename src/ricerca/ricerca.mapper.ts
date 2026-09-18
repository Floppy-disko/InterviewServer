import { Injectable } from '@nestjs/common';
import { ResponseRicercaDto } from './dto/response-ricerca.dto.js';
import { Prisma, Ricerca } from '../generated/prisma/client.js';
import { CreateRicercaDto } from './dto/create-ricerca.dto.js';
import { RicercaSelectParamsDto } from './dto/ricerca-select-params.dto.js';
import { RicercaWhereParamsDto } from './dto/ricerca-where-params.dto.js';
import { RicercaFindAllParamsDto } from './ricerca.controller.js';

@Injectable()
export class RicercaMapper {

  modelToDto(ricerca: Ricerca): ResponseRicercaDto {
    return structuredClone(ricerca);
  }

  modelToPartialDto(ricerca: Partial<Ricerca>): Partial<ResponseRicercaDto> {
    return structuredClone(ricerca);
  }

  createDtoToModel(dto: CreateRicercaDto): Prisma.RicercaCreateInput {
    return structuredClone(dto);
  }

  updateDtoToModel(dto: Partial<CreateRicercaDto>): Prisma.RicercaUpdateInput {
    return structuredClone(dto);
  }

  selectParamsDtoToModel(params: RicercaSelectParamsDto) {
    const { exclude } = params;

    return {
      id: !exclude?.includes('id'),
      descrizione: !exclude?.includes('descrizione'),
      stato: !exclude?.includes('stato'),
    };
  }

  whereParamsDtoToModel(params: RicercaWhereParamsDto) {
    const { id, stato } = params;

    return {
      AND: [
        { id: id ? { in: id } : undefined },
        { stato: stato ? { in: stato } : undefined },
      ],
    };
  }

  allParamsDtoToModel(
    params: RicercaFindAllParamsDto,
  ): Prisma.RicercaFindManyArgs {
    const { id, stato, exclude, ...rest } = params;

    return {
      ...rest,
      select: this.selectParamsDtoToModel({ exclude }),
      where: this.whereParamsDtoToModel({ id, stato }),
    };
  }
}