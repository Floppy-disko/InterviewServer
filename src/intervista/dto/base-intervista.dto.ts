import { IsDate, IsOptional, IsString } from 'class-validator';

export class BaseIntervistaDto {
  /**
   * Status of the interview.
   * @example "programmata"
   */
  @IsOptional()
  @IsString()
  stato?: string;

  /**
   * Optional notes or feedback regarding the interview session.
   * @example "Technical screening round 1"
   */
  @IsOptional()
  @IsString()
  note?: string;

  /**
   * Start timestamp (ISO 8601).
   * Must be strictly before `fine`. Participants cannot have overlapping interviews.
   * @example "2030-01-15T09:00:00.000Z"
   */
  @IsDate()
  inizio!: Date;

  /**
   * End timestamp (ISO 8601).
   * Must be strictly after `inizio`. Participants cannot have overlapping interviews.
   * @example "2030-01-15T10:00:00.000Z"
   */
  @IsDate()
  fine!: Date;
}
