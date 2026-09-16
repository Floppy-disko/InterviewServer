import { PickType } from '@nestjs/mapped-types';
import { CreateUtenteDto } from '../../utente/dto/create-utente.dto';
import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsDateString, IsInt, IsOptional, IsString, Min, ValidateNested } from 'class-validator';
import { BaseIntervistaDto } from './base-intervista-dto';

export class CreateIntervistaDto extends BaseIntervistaDto {

    @IsInt()
    @Min(0)
    candidato!: number;

    @IsArray()
    @ArrayMinSize(1)
    @IsInt({ each: true })
    @Min(0, { each: true })
    intervistatori!: number[];
}
