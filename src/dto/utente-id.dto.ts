import { IsInt, Min } from 'class-validator';

export class UtenteIdDto {
  /**
   * User ID to associate (e.g. interviewer to add, or selected candidate).
   * - Must exist in the database.
   * - For interviews: user cannot be already busy during the interview's scheduled time.
   * @example 2
   */
  @IsInt()
  @Min(0)
  utenteId!: number;
}
