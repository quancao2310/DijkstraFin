import mongoose from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type RecordDocument = mongoose.HydratedDocument<Record>;

@Schema()
export class Record {
  @Prop({
    type: Number,
    required: true,
  })
  amount: number;

  @Prop({
    type: String,
    required: true,
  })
  type: "income" | "expense";

  @Prop({
    type: String,
    required: true,
  })
  category: string;

  @Prop({
    type: String,
    required: true,
  })
  description: string;

  @Prop({
    type: Date,
    required: true,
    default: () => new Date().toISOString().split("T")[0],
  })
  date: Date;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "Goal",
  })
  goal: mongoose.Types.ObjectId;
}

export const RecordSchema = SchemaFactory.createForClass(Record);
