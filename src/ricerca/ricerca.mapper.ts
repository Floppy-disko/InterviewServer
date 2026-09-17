import { Injectable } from '@nestjs/common';
import { ResponseRicercaDto } from './dto/response-ricerca.dto.js';
import { Prisma, Ricerca } from '../generated/prisma/client.js';
import { CreateRicercaDto } from './dto/create-ricerca.dto.js';
import { RicercaListParamsDto } from './dto/ricerca-list-params.dto.js';

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

  listParamsDtoToModel(dto: RicercaListParamsDto) {
    const { id, stato, exclude, ...rest } = dto;

    return {
      ...rest,
      select: {
        id: !exclude?.includes('id'),
        descrizione: !exclude?.includes('descrizione'),
        stato: !exclude?.includes('stato'),
      },
      where: {
        AND: [
          { id: id ? { in: id } : undefined },
          { stato: stato ? { in: stato } : undefined },
        ]
      }
    };
  }
}  