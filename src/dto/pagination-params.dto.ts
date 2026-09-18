import { IsInt, IsOptional, Min } from 'class-validator';

export class PaginationParamsDto {
  @IsOptional()
  @IsInt()
  @Min(0)
  skip?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  take?: number;
}