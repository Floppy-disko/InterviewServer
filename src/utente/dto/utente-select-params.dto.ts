import { Transform } from 'class-transformer';
import { IsArray, IsIn, IsOptional } from 'class-validator';

export const UTENTE_FIELDS = [
  'id',
  'nome',
  'cognome',
  'email',
  'ruolo',
] as const;

function csv({ value }: { value: unknown }) {
  return typeof value === 'string' ? value.split(',') : value;
}

export class UtenteSelectParamsDto {
  @IsOptional()
  @Transform(csv)
  @IsArray()
  @IsIn(UTENTE_FIELDS, { each: true })
  exclude?: string[];
}