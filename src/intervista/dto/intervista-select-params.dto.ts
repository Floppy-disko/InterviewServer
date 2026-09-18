import { Transform } from 'class-transformer';
import {
  IsArray,
  IsIn,
  IsInt,
  IsOptional,
  Min,
} from 'class-validator';
import { IntervistaWhereParamsDto } from './Intervista-where-params.dto.js';
import { SelectParamsDto } from '../../dto/select-params.dto.js';

export const INTERVISTA_FIELDS = [
  'id',
  'inizio',
  'fine',
  'stato',
  'candidato',
  'intervistatori',
  'ricerca',
] as const;

export class IntervistaSelectParamsDto extends SelectParamsDto {
  @IsIn(INTERVISTA_FIELDS, { each: true })
  declare exclude?: (typeof INTERVISTA_FIELDS)[number][];
}

let a : IntervistaSelectParamsDto;