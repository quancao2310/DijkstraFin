import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { GoalType } from "../types/goals.type";
import { ApiProperty } from "@nestjs/swagger";

export type GoalDocument = HydratedDocument<Goal>;

@Schema({
  timestamps: true,
})
export class Goal {
  @Prop({
    type: String,
    required: true,
  })
  @ApiProperty({
    description: "The name of the goal",
    example: "Go to the City of Love, Paris",
  })
  name: string;

  @Prop({
    type: String,
    required: true,
  })
  @ApiProperty({
    description: 'The type of the goal, which is either "saving" or "budget"',
    example: GoalType.SAVING,
    enum: GoalType,
  })
  type: GoalType;

  @Prop({
    type: Number,
    required: true,
  })
  @ApiProperty({
    description: "The total amount of the goal in VND",
    example: 50_000_000_000,
  })
  total: number;

  @Prop({
    type: Number,
    required: true,
    default: 0,
  })
  @ApiProperty({
    description: "The initial balance of the goal in VND.",
    example: 1_000_000,
    default: 0,
  })
  initialBalance: number;

  @Prop({
    type: Number,
    required: true,
    default: 0,
  })
  @ApiProperty({
    description: "The current balance of the goal in VND.",
    example: 10_000_000,
  })
  balance: number;
}

export const GoalSchema = SchemaFactory.createForClass(Goal);
