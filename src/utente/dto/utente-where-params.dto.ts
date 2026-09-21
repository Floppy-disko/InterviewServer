import { Transform } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

function csv({ value }: { value: unknown }) {
  return typeof value === 'string' ? value.split(',') : value;
}

function csvNumber({ value }: { value: unknown }) {
  return typeof value === 'string' ? value.split(',').map(Number) : value;
}

export class UtenteWhereParamsDto {
  @IsOptional()
  @Transform(csvNumber)
  @IsArray()
  @IsInt({ each: true })
  @Min(0, { each: true })
  id?: number[];

  @IsOptional()
  @Transform(csv)
  @IsArray()
  @IsString({ each: true })
  nome?: string[];

  @IsOptional()
  @Transform(csv)
  @IsArray()
  @IsString({ each: true })
  cognome?: string[];

  @IsOptional()
  @Transform(csv)
  @IsArray()
  @IsEmail({}, { each: true })
  email?: string[];

  @IsOptional()
  @Transform(csv)
  @IsArray()
  @IsString({ each: true })
  ruolo?: string[];

  @IsOptional()
  @Transform(csvNumber)
  @IsArray()
  @IsInt({ each: true })
  @Min(0, { each: true })
  intervisteRicevute?: number[];

  @IsOptional()
  @Transform(csvNumber)
  @IsArray()
  @IsInt({ each: true })
  @Min(0, { each: true })
  intervisteEffettuate?: number[];

  @IsOptional()
  @Transform(csvNumber)
  @IsArray()
  @IsInt({ each: true })
  @Min(0, { each: true })
  selezionatoIn?: number[];
}