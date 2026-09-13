import { IsEmail, IsInt, IsOptional, IsString } from 'class-validator';

export class ResponseUtenteDto {
  @IsInt()
  id!: number;

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
