import { IsOptional, IsString } from 'class-validator';

export class BaseRicercaDto {
  @IsString()
  descrizione: string;

  @IsOptional()
  @IsString()
  stato?: string;
}
