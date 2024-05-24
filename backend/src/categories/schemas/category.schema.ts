import mongoose from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { CategoryType } from "../../types";

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
  })
  @ApiProperty({
    description: "The type of the category.",
    enum: CategoryType,
    example: CategoryType.INCOME,
  })
  type: CategoryType;

  @Prop({
    type: Number,
    default: null,
  })
  @ApiProperty({
    description: `The budget of the category in VND. This only applies to expense categories, 
      although it is not compulsory. For an income category, this field should always be null.`,
    example: 1_000_000,
  })
  budget: number;

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
