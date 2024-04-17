import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { GoalType } from "../types/goals.type";

export class CreateGoalDto {
  @ApiProperty({
    description: "The name of the goal",
    example: "Go to the City of Love, Paris",
  })
  name: string;

  @ApiProperty({
    description: 'The type of the goal, which is either "saving" or "budget"',
    example: GoalType.SAVING,
    enum: GoalType,
  })
  type: string;

  @ApiProperty({
    description: "The total amount of the goal in VND",
    example: 50_000_000_000,
  })
  total: number;

  @ApiPropertyOptional({
    description:
      "The initial balance of the goal in VND. If not specified, it will be 0",
    example: 1_000_000,
    default: 0,
  })
  initialBalance: number;
}
