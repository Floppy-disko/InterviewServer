import { Transform } from 'class-transformer';
import {
	IsArray,
	IsDateString,
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
	id?: number[];

	@IsOptional()
	@Transform(csv)
	@IsArray()
	@IsDateString({}, { each: true })
	inizio?: string[];

	@IsOptional()
	@Transform(csv)
	@IsArray()
	@IsDateString({}, { each: true })
	fine?: string[];

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

type MissingIntervistaFields = Exclude<
	(typeof INTERVISTA_FIELDS)[number],
	keyof IntervistaListParamsDto
>;
const allIntervistaFieldsAreInTheDto: MissingIntervistaFields extends never
	? true
	: never = true;