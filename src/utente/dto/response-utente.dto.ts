import { PartialType } from '@nestjs/mapped-types';
import { IsInt, IsOptional, Min } from 'class-validator';
import { BaseUtenteDto } from './base-utente.dto';

export class ResponseUtenteDto extends BaseUtenteDto {
  
  @IsInt()
  @Min(0)
  id?: number;
}
