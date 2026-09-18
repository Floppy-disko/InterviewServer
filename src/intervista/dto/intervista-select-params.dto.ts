import { Transform } from 'class-transformer';
import {
  IsArray,
  IsIn,
  IsInt,
  IsOptional,
  Min,
} from 'class-validator';
import { IntervistaWhereParamsDto } from './Intervista-where-params.dto.js';

export const INTERVISTA_FIELDS = [
  'id',
  'inizio',
  'fine',
  'stato',
  'candidato',
  'intervistatori',
  'ricerca',
] as const;

function csv({ value }: { value: unknown }) {
  return typeof value === 'string' ? value.split(',') : value;
}

export class IntervistaSelectParamsDto {
  @IsOptional()
  @Transform(csv)
  @IsArray()
  @IsIn(INTERVISTA_FIELDS, { each: true })
  exclude?: string[];
}
