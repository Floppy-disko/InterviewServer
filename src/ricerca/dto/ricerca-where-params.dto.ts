import { Transform } from 'class-transformer';
import {
  IsArray,
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

export class RicercaWhereParamsDto {
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
  stato?: string[];

  @IsOptional()
  @Transform(csvNumber)
  @IsArray()
  @IsInt({ each: true })
  @Min(0, { each: true })
  interviste?: number[];

  @IsOptional()
  @Transform(csvNumber)
  @IsArray()
  @IsInt({ each: true })
  @Min(0, { each: true })
  selezionati?: number[];
}