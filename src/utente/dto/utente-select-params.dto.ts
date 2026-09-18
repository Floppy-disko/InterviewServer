import { IsIn } from 'class-validator';
import { SelectParamsDto } from '../../dto/select-params.dto.js';

export const UTENTE_FIELDS = [
  'id',
  'nome',
  'cognome',
  'email',
  'ruolo',
] as const;

export class UtenteSelectParamsDto extends SelectParamsDto {
@IsIn(UTENTE_FIELDS, { each: true })
  declare exclude?: (typeof UTENTE_FIELDS)[number][];
}