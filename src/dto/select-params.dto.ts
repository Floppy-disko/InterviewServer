import { IsArray, IsBoolean, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

function csv({ value }: { value: unknown }) {
  return typeof value === 'string' ? value.split(',') : value;
}

export class SelectParamsDto {
  @IsOptional()
  @Transform(csv)
  @IsArray()
  exclude?: string[]; //fields da escludere

  
  @IsOptional()
  @Transform(() => true) //mi interessa solo se il valore è presente, ignoro il valore
  @IsBoolean()
  fullRelations?: true; //se true, include informazioni delle relazioni
}