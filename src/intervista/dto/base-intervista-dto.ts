import { IsDateString, IsInt, IsString, Min } from "class-validator";

export class BaseIntervistaDto {
    @IsInt()
    @Min(0)
    id!: number;

    @IsDateString()
    inizio!: Date;

    @IsDateString()
    fine!: Date;

    @IsInt()
    @Min(0)
    ricerca!: number;
}