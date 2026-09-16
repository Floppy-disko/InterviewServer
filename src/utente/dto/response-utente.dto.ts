import { PartialType } from '@nestjs/mapped-types';
import { IsInt, IsOptional } from 'class-validator';
import { BaseUtenteDto } from './base-utente.dto.js';

export class ResponseUtenteDto extends PartialType(BaseUtenteDto) {
  @IsOptional()
  @IsInt()
  id?: number;
}
