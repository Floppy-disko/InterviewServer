import { PartialType, PickType } from '@nestjs/mapped-types';
import { ResponseUtenteDto } from '../../utente/dto/response-utente.dto';
import { Type } from 'class-transformer';
import { IsArray, IsDateString, IsInt, IsOptional, IsString, Min, ValidateNested } from 'class-validator';
import { BaseIntervistaDto } from './base-intervista-dto';

//prendo solo i campi che mi interessano dal dto Utente, in teoria eredita i decorators
export class UtenteSummaryDto extends PickType(
  ResponseUtenteDto,
  ['id', 'nome', 'cognome'] as const,
) { }

//nonostante sia un tipo semplice mi serve una classe per poter usare i decorators di class-validator
export class RicercaSummaryDto {
  @IsInt()
  @Min(0)
  id!: number;
}

export class ResponseIntervistaDto extends BaseIntervistaDto{

  @IsInt()
  @Min(0)
  id!: number;

  @ValidateNested()
  candidato!: UtenteSummaryDto;

  @IsArray()
  @ValidateNested({ each: true })
  intervistatori!: UtenteSummaryDto[];

  @ValidateNested()
  ricerca!: RicercaSummaryDto;
}
