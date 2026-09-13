import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateUtenteDto {
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
