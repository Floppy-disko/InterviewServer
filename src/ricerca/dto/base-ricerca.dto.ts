import { IsString } from 'class-validator';

export class BaseRicercaDto {
  @IsString()
  descrizione: string;

  @IsString()
  stato: string;
}
