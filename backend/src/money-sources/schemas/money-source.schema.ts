import mongoose from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";

@Schema()
export class MoneySource {
  @Prop({
    type: String,
    required: true,
  })
  @ApiProperty({
    description: "The name of the money source.",
    example: "ABC Bank",
  })
  name: string;

  @Prop({
    type: Number,
    required: true,
  })
  @ApiProperty({
    description: "The balance of the money source in VND.",
    example: 1_000_000,
  })
  balance: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  })
  @ApiProperty({
    description: "The ID of the user this money source belongs to.",
    example: "664da67d075cdd1e0f0a9851",
  })
  userId: mongoose.Types.ObjectId;
}

export type MoneySourceDocument = mongoose.HydratedDocument<MoneySource>;

export const MoneySourceSchema = SchemaFactory.createForClass(MoneySource);
