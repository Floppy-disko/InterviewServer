import { IsArray, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

function csv({ value }: { value: unknown }) {
  return typeof value === 'string' ? value.split(',') : value;
}

export class SelectParamsDto {
  @IsOptional()
  @Transform(csv)
  @IsArray()
  exclude?: string[];
}