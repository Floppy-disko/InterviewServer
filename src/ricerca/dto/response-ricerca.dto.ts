import { BaseRicercaDto } from './base-ricerca.dto.js';
import type { ResponseIntervistaDto } from '../../intervista/dto/response-intervista.dto.js';
import type { ResponseUtenteDto } from '../../utente/dto/response-utente.dto.js';

export class ResponseRicercaDto extends BaseRicercaDto {
  id: number;
  interviste!: (number | ResponseIntervistaDto)[];
  selezionati!: (number | ResponseUtenteDto)[];
}
