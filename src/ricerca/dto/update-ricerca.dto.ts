import { PartialType } from '@nestjs/swagger';
import { CreateRicercaDto } from './create-ricerca.dto.js';

export class UpdateRicercaDto extends PartialType(CreateRicercaDto) {}
