import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type GoalDocument = HydratedDocument<Goal>;

@Schema()
export class Goal {
  @Prop()
  name: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  budget: number;

  @Prop()
  balance: number;
}

export const GoalSchema = SchemaFactory.createForClass(Goal);
