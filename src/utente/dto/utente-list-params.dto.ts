import { Transform } from 'class-transformer';
import {
  Min,
  IsIn,
  IsInt,
  IsOptional,
  IsArray,
  IsString,
  IsEmail,
} from 'class-validator';

const UTENTE_FIELDS = ['id', 'nome', 'cognome', 'email', 'ruolo'] as const;

function csv({ value }: { value: unknown }) {
  return typeof value === 'string' ? value.split(',') : value;
}

export class UtenteListParamsDto {
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
  @Transform(csv)
  @IsArray()
  @IsIn(UTENTE_FIELDS, { each: true })
  exclude?: string[];
}
