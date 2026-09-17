import { IsEmail, IsOptional, IsString } from 'class-validator';

export class BaseUtenteDto {
  @IsEmail()
  email!: string;

  @IsString()
  nome!: string;

  @IsString()
  cognome!: string;

  @IsOptional()
  @IsString()
  ruolo?: string;
}
