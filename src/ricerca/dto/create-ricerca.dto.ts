import { IsOptional, IsString } from "class-validator";

export class CreateRicercaDto {
    @IsOptional()
    @IsString()
    stato?: string;

    @IsString()
    descrizione!: string;
}
