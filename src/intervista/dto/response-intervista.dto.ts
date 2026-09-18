import {
  IntersectionType,
  OmitType,
  PartialType,
  PickType,
} from '@nestjs/mapped-types';
import { ResponseUtenteDto } from '../../utente/dto/response-utente.dto.js';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { BaseIntervistaDto } from './base-intervista-dto.js';

//da utente prendo id e gli altri campi opzionali
export class UtenteSummaryDto extends IntersectionType(
  PickType(ResponseUtenteDto, ['id'] as const),
  PartialType(
    OmitType(ResponseUtenteDto, ['id'] as const),
  ),
) {}

//nonostante sia un tipo semplice mi serve una classe per poter usare i decorators di class-validator
export class RicercaSummaryDto {
  @IsInt()
  @Min(0)
  id!: number;
}

export class ResponseIntervistaDto extends BaseIntervistaDto {
  @IsInt()
  @Min(0)
  id!: number;

  @ValidateNested()
  candidato!: UtenteSummaryDto;

  @IsArray()
  @ValidateNested({ each: true })
  intervistatori!: UtenteSummaryDto[];

  @ValidateNested()
  ricerca!: RicercaSummaryDto;
}
