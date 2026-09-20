import { BaseIntervistaDto } from './base-intervista.dto.js';
import { ResponseUtenteDto } from '../../utente/dto/response-utente.dto.js';
import { ResponseRicercaDto } from '../../ricerca/dto/response-ricerca.dto.js';

export class ResponseIntervistaDto extends BaseIntervistaDto {
    id!: number
    candidato!: number | ResponseUtenteDto
    intervistatori!: (number | ResponseUtenteDto)[]
    ricerca!: number | ResponseRicercaDto
}
