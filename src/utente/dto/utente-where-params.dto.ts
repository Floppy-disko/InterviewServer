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

export class UtenteWhereParamsDto {
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
}