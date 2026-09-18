import { Transform } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

function csv({ value }: { value: unknown }) {
  return typeof value === 'string' ? value.split(',') : value;
}

export class IntervistaWhereParamsDto {

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
}
