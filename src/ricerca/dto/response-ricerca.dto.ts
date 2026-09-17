import { IsInt, Min } from 'class-validator';
import { BaseRicercaDto } from './base-ricerca.dto.js';

export class ResponseRicercaDto extends BaseRicercaDto {
  @IsInt()
  @Min(0)
  id: number;
}
