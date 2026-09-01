import { PartialType } from '@nestjs/mapped-types';
import { CreateIntervistaDto } from './create-intervista.dto';

export class UpdateIntervistaDto extends PartialType(CreateIntervistaDto) {}
