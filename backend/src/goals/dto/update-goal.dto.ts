import { PartialType, ApiProperty } from "@nestjs/swagger";
import { CreateGoalDto } from "./create-goal.dto";
import { IsOptional, IsString } from "class-validator";

export class UpdateGoalDto extends PartialType(CreateGoalDto) {
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: "The status of the goal. True if completed, false otherwise.",
    example: false,
    default: false,
    required: false,
  })
  isCompleted?: boolean;
}
