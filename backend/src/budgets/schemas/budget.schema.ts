import mongoose from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";

@Schema()
export class Budget {
  @Prop({
    type: Number,
    required: true,
  })
  @ApiProperty({
    description: "The total amount of budget in VND.",
    example: 1_000_000,
  })
  amount: number;

  @Prop({
    type: Number,
    default: 0,
  })
  @ApiProperty({
    description: `The amount of money spent in VND,
      will be reset to 0 at the beginning of each month.`,
    example: 500_000,
    default: 0,
  })
  currentSpent: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  })
  @ApiProperty({
    description: "The ID of the category for this budget.",
    example: "664da67d075cdd1e0f0a9851",
  })
  categoryId: mongoose.Types.ObjectId;
}

export type BudgetDocument = mongoose.HydratedDocument<Budget>;

export const BudgetSchema = SchemaFactory.createForClass(Budget);
