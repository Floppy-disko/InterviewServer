import { Transform } from 'class-transformer';
import { IsArray, IsIn, IsOptional } from 'class-validator';

export const RICERCA_FIELDS = ['id', 'stato', 'descrizione'] as const;

function csv({ value }: { value: unknown }) {
  return typeof value === 'string' ? value.split(',') : value;
}

export class RicercaSelectParamsDto {
  @IsOptional()
  @Transform(csv)
  @IsArray()
  @IsIn(RICERCA_FIELDS, { each: true })
  exclude?: string[];
}