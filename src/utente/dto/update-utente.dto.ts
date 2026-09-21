import { PartialType } from '@nestjs/swagger';
import { CreateUtenteDto } from './create-utente.dto.js';

export class UpdateUtenteDto extends PartialType(CreateUtenteDto) {}
