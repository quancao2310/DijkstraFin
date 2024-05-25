import mongoose from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { TransactionType } from "../../types";

@Schema()
export class Record {
  @Prop({
    type: Number,
    required: true,
  })
  @ApiProperty({
    description: "The amount of the record in VND.",
    example: 10_000_000,
  })
  amount: number;

  @Prop({
    type: String,
    required: true,
  })
  @ApiProperty({
    description:
      'The type of the record, which is "income", "expense", or "saving".',
    enum: TransactionType,
    example: TransactionType.INCOME,
  })
  type: TransactionType;

  @Prop({
    type: String,
    default: "",
  })
  @ApiProperty({
    description: "The description of the record.",
    example: "Salary of January 2021",
    default: "",
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
    default: new Date().toISOString().split("T")[0],
  })
  date: Date;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  })
  @ApiProperty({
    description: "The ID of the category for this record.",
    example: "664f6a1b0eece94eab97ada0",
  })
  categoryId: mongoose.Types.ObjectId;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "MoneySource",
    required: true,
  })
  @ApiProperty({
    description: `The ID of the money source this record belongs to.
      Caution: The money source and the category must belong to the same user.
      Validation for this has not been setup yet. Please make sure to follow this.`,
    example: "664ebbacbb15d5d4a664d3a9",
  })
  moneySourceId: mongoose.Types.ObjectId;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "Goal",
    default: null,
    validate: {
      validator: function (value: string | null) {
        console.log(value);
        return this.type !== TransactionType.SAVING
          ? value === null
          : value !== null;
      },
      message: function (props: any) {
        return props.value !== null
          ? "Goal should only be set for saving records."
          : `Goal ID is required for saving records.`;
      },
    },
  })
  @ApiPropertyOptional({
    description: `The ID of the goal that this record is related to.
      A record of type "saving" must have a goal. Other types must not have a goal.`,
    example: "66201ff2b7049857abc2b2eb",
    default: null,
  })
  goalId: mongoose.Types.ObjectId;
}

export type RecordDocument = mongoose.HydratedDocument<Record>;

export const RecordSchema = SchemaFactory.createForClass(Record);

RecordSchema.pre(["find", "findOne"], function () {
  this.populate("categoryId").populate("moneySourceId").populate("goalId");
});
