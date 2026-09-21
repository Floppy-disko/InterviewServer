import { IsDate, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class BaseIntervistaDto {
  @IsOptional()
  @IsString()
  stato?: string;

  @IsOptional()
  @IsString()
  note?: string;

  @IsDate()
  inizio!: Date;

  @IsDate()
  fine!: Date;
}
