import { PartialType } from '@nestjs/mapped-types';
import { CreateRicercaDto } from './create-ricerca.dto';

export class UpdateRicercaDto extends PartialType(CreateRicercaDto) {}
