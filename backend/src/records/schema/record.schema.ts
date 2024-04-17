import mongoose from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { RecordType } from "../types/records.type";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export type RecordDocument = mongoose.HydratedDocument<Record>;

@Schema()
export class Record {
  @Prop({
    type: Number,
    required: true,
  })
  @ApiProperty({
    description: "The amount of the record in VND",
    example: 10000000,
  })
  amount: number;

  @Prop({
    type: String,
    required: true,
  })
  @ApiProperty({
    description:
      'The type of the record, which is either "income" or "expense"',
    enum: RecordType,
    example: RecordType.INCOME,
  })
  type: RecordType;

  @Prop({
    type: String,
    required: true,
  })
  @ApiProperty({
    description: "The category of the record",
    example: "salary",
  })
  category: string;

  @Prop({
    type: String,
    required: true,
  })
  @ApiProperty({
    description: "The description of the record",
    example: "Salary of January 2021",
  })
  description: string;

  @Prop({
    type: Date,
    required: true,
    default: () => new Date().toISOString().split("T")[0],
  })
  @ApiProperty({
    description: "The date of the record, in the format of YYYY-MM-DD.",
    example: "2021-01-01",
  })
  date: Date;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "Goal",
  })
  @ApiPropertyOptional({
    description:
      "The ID of the goal that this record is related to. If not specified, it will be null.",
    example: "1234567890",
    default: null,
  })
  goal: mongoose.Types.ObjectId;
}

export const RecordSchema = SchemaFactory.createForClass(Record);
