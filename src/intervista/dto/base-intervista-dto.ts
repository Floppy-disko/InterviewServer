import { IsDate, IsInt, IsString, Min } from "class-validator";

export class BaseIntervistaDto {
    
    @IsString()
    stato!: string;

    @IsDate()
    inizio!: Date;

    @IsDate()
    fine!: Date;

    @IsInt()
    @Min(0)
    ricerca!: number;
}