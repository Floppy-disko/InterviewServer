import { PartialType } from '@nestjs/swagger';
import { CreateIntervistaDto } from './create-intervista.dto.js';

export class UpdateIntervistaDto extends PartialType(CreateIntervistaDto) {}
