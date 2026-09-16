import { PickType } from '@nestjs/mapped-types';
import { CreateUtenteDto } from '../../utente/dto/create-utente.dto';
import { Type } from 'class-transformer';
import { IsArray, IsDateString, IsInt, IsOptional, IsString, Min, ValidateNested } from 'class-validator';
import { BaseIntervistaDto } from './base-intervista-dto';

export class CreateIntervistaDto extends BaseIntervistaDto {

    @IsOptional()
    @IsString()
    stato?: string;

    @IsInt()
    @Min(0)
    candidato!: number;

    @IsInt()
    @Min(0)
    intervistatori!: number[];
}
