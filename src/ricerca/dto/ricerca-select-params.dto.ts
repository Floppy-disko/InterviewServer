import { IsIn } from 'class-validator';
import { SelectParamsDto } from '../../dto/select-params.dto.js';

export const RICERCA_FIELDS = [
  'id',
  'stato',
  'descrizione',
  'interviste',
  'selezionati',
] as const;

export class RicercaSelectParamsDto extends SelectParamsDto {
  @IsIn(RICERCA_FIELDS, { each: true })
  declare exclude?: (typeof RICERCA_FIELDS)[number][];
}