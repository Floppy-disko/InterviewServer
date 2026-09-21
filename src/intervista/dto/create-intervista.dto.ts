import { ArrayMinSize, IsArray, IsInt, Min } from 'class-validator';
import { BaseIntervistaDto } from './base-intervista.dto.js';

export class CreateIntervistaDto extends BaseIntervistaDto {
  @IsInt()
  @Min(0)
  candidato!: number;

  @IsArray()
  @ArrayMinSize(1)
  @IsInt({ each: true })
  @Min(0, { each: true })
  intervistatori!: number[];

  @IsInt()
  @Min(0)
  ricerca!: number;
}
