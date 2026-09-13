import { Type, Transform } from "class-transformer";
import { IsIn, IsInt, IsOptional, IsArray, IsString, IsEmail } from "class-validator";

const UTENTE_FIELDS = ['nome', 'cognome', 'email', 'ruolo'] as const;

function csv({ value }: { value: unknown }){
  return typeof value === 'string' ? value.split(',') : value;
}

export class UtenteListParamsDto {

  @IsOptional()
  @IsInt()
  skip?: number;

  @IsOptional()
  @IsInt()
  take?: number;

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
};

//essere sicuro che tutti i campi del model siano presenti nel dto
type MissingUtenteFields = Exclude<(typeof UTENTE_FIELDS)[number], keyof UtenteListParamsDto>;
const allUtenteFieldsAreInTheDto: MissingUtenteFields extends never ? true : never = true;