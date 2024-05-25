import mongoose from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { TransactionType } from "../../types";

@Schema()
export class Category {
  @Prop({
    type: String,
    required: true,
  })
  @ApiProperty({
    description: "The name of the category.",
    example: "Salary",
  })
  name: string;

  @Prop({
    type: String,
    required: true,
    enum: TransactionType,
  })
  @ApiProperty({
    description: "The type of the category.",
    enum: TransactionType,
    example: TransactionType.INCOME,
  })
  type: TransactionType;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    default: null,
    validate: {
      validator: function (value: number | null) {
        return this.type !== TransactionType.EXPENSE ? value === null : true;
      },
      message: "Budget should only be set for expense categories.",
    },
  })
  @ApiProperty({
    description: `The budget of the category. This only applies to expense categories, 
      although it is not compulsory. For other categories, this field should always be null.`,
    example: "664da67d075cdd1e0f0a9851",
    default: null,
  })
  budgetId: mongoose.Types.ObjectId;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  })
  @ApiProperty({
    description: "The ID of the user this category belongs to.",
    example: "664da67d075cdd1e0f0a9851",
  })
  userId: mongoose.Types.ObjectId;
}

export type CategoryDocument = mongoose.HydratedDocument<Category>;

export const CategorySchema = SchemaFactory.createForClass(Category);
