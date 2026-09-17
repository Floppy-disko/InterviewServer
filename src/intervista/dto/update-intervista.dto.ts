import { PartialType } from '@nestjs/mapped-types';
import { CreateIntervistaDto } from './create-intervista.dto.js';

export class UpdateIntervistaDto extends PartialType(CreateIntervistaDto) {}
