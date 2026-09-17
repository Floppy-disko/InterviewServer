import {
  IsIn,
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { Transform } from 'class-transformer';

const RICERCA_FIELDS = ['id', 'stato', 'descrizione'] as const;

function csv({ value }: { value: unknown }) {
  return typeof value === 'string' ? value.split(',') : value;
}

export class RicercaListParamsDto {
  @IsOptional()
  @IsInt()
  @Min(0)
  skip?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  take?: number;

  @IsOptional()
  @Transform(csv)
  @IsArray()
  @IsInt({ each: true })
  @Min(0, { each: true })
  id?: number[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  stato?: string[];

  @IsOptional()
  @Transform(csv)
  @IsArray()
  @IsIn(RICERCA_FIELDS, { each: true })
  exclude?: string[];
}
