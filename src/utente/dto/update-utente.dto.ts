import { PartialType } from '@nestjs/mapped-types';
import { CreateUtenteDto } from './create-utente.dto.js';

export class UpdateUtenteDto extends PartialType(CreateUtenteDto) {}
