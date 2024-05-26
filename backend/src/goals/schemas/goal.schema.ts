import mongoose from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";

@Schema()
export class Goal {
  @Prop({
    type: String,
    required: true,
  })
  @ApiProperty({
    description: "The name of the goal.",
    example: "Go to the City of Love, Paris",
  })
  name: string;

  @Prop({
    type: Number,
    required: true,
  })
  @ApiProperty({
    description: "The total amount of the goal in VND.",
    example: 10_000_000_000,
  })
  total: number;

  @Prop({
    type: Number,
    required: true,
    default: 0,
  })
  @ApiProperty({
    description: "The current balance of the goal in VND.",
    example: 10_000_000,
    default: 0,
  })
  balance: number;

  @Prop({
    type: Boolean,
    required: true,
    default: false,
  })
  @ApiProperty({
    description: "The status of the goal. True if completed, false otherwise.",
    example: false,
    default: false,
  })
  isCompleted: boolean;

  @Prop({
    type: Date,
    required: true,
  })
  @ApiProperty({
    description: "The start date of the goal. Format is YYYY-MM-DD.",
    example: "2023-12-31",
  })
  startDate: Date;

  @Prop({
    type: Date,
    required: true,
  })
  @ApiProperty({
    description: "The end date of the goal. Format is YYYY-MM-DD.",
    example: "2024-12-31",
  })
  endDate: Date;

  @Prop({
    type: String,
    default: null,
  })
  @ApiProperty({
    description: "The icon of the goal.",
    example: "house",
  })
  icon: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  })
  @ApiProperty({
    description: "The ID of the user this goal belongs to.",
    example: "664da67d075cdd1e0f0a9851",
  })
  userId: mongoose.Types.ObjectId;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "MoneySource",
    required: true,
  })
  @ApiProperty({
    description: "The ID of the money source this goal belongs to.",
    example: "664da67d075cdd1e0f0a9851",
  })
  moneySourceId: mongoose.Types.ObjectId;
}

export type GoalDocument = mongoose.HydratedDocument<Goal>;

export const GoalSchema = SchemaFactory.createForClass(Goal);
