import { IsDateString, IsInt, IsString } from "class-validator";

export class BaseIntervistaDto {
    @IsInt()
    id!: number;

    @IsDateString()
    inizio!: Date;

    @IsDateString()
    fine!: Date;

    @IsInt()
    ricerca!: number;
}