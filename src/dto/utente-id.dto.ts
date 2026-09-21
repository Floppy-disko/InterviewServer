import { IsInt, Min } from 'class-validator';

export class UtenteIdDto {
  @IsInt()
  @Min(0)
  utenteId!: number;
}
