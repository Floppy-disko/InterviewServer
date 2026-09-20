import { BaseUtenteDto } from './base-utente.dto.js';
import type { ResponseIntervistaDto } from '../../intervista/dto/response-intervista.dto.js';
import type { ResponseRicercaDto } from '../../ricerca/dto/response-ricerca.dto.js';

export class ResponseUtenteDto extends BaseUtenteDto {
  id?: number;
  intervisteRicevute!: (number | ResponseIntervistaDto)[];
  intervisteEffettuate!: (number | ResponseIntervistaDto)[];
  selezionatoIn?: number | ResponseRicercaDto;
}
