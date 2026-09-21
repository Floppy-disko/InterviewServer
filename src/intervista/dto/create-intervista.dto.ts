import { ArrayMinSize, IsArray, IsInt, Min } from 'class-validator';
import { BaseIntervistaDto } from './base-intervista.dto.js';

export class CreateIntervistaDto extends BaseIntervistaDto {
  /**
   * User ID of the candidate.
   * - Must exist in the database.
   * - Must be different from all interviewer IDs in `intervistatori`.
   * - Candidate must not have overlapping interviews during [inizio, fine].
   * @example 1
   */
  @IsInt()
  @Min(0)
  candidato!: number;

  /**
   * Array of interviewer user IDs (at least 1 required).
   * - All interviewers must exist in the database.
   * - Cannot include the candidate ID.
   * - None of the interviewers can have overlapping interviews during [inizio, fine].
   * @example [2, 3]
   */
  @IsArray()
  @ArrayMinSize(1)
  @IsInt({ each: true })
  @Min(0, { each: true })
  intervistatori!: number[];

  /**
   * ID of the recruitment campaign (ricerca) this interview belongs to.
   * Must exist in the database.
   * @example 1
   */
  @IsInt()
  @Min(0)
  ricerca!: number;
}
