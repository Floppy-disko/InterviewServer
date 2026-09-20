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

export class RicercaWhereParamsDto {
  @IsOptional()
  @Transform(csv)
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
  @Transform(csv)
  @IsArray()
  @IsInt({ each: true })
  @Min(0, { each: true })
  interviste?: number[];

  @IsOptional()
  @Transform(csv)
  @IsArray()
  @IsInt({ each: true })
  @Min(0, { each: true })
  selezionati?: number[];
}