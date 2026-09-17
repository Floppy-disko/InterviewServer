import { Transform } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

const INTERVISTA_FIELDS = [
  'id',
  'inizio',
  'fine',
  'stato',
  'candidato',
  'intervistatori',
  'ricerca',
] as const;

function csv({ value }: { value: unknown }) {
  return typeof value === 'string' ? value.split(',') : value;
}

export class IntervistaListParamsDto {
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
  @IsDate()
  before?: Date;

  @IsOptional()
  @IsDate()
  after?: Date;

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
  candidato?: number[];

  @IsOptional()
  @Transform(csv)
  @IsArray()
  @IsInt({ each: true })
  @Min(0, { each: true })
  intervistatori?: number[];

  @IsOptional()
  @Transform(csv)
  @IsArray()
  @IsInt({ each: true })
  @Min(0, { each: true })
  ricerca?: number[];

  @IsOptional()
  @Transform(csv)
  @IsArray()
  @IsIn(INTERVISTA_FIELDS, { each: true })
  exclude?: string[];
}
