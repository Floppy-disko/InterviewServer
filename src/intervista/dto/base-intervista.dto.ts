import { IsDate, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class BaseIntervistaDto {
  @IsOptional()
  @IsString()
  stato?: string;

  @IsDate()
  inizio!: Date;

  @IsDate()
  fine!: Date;
}
