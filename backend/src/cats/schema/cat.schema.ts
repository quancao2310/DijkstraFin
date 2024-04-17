import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { ApiProperty } from "@nestjs/swagger";

export type CatDocument = HydratedDocument<Cat>;

@Schema()
export class Cat {
  @Prop({ required: true })
  @ApiProperty({
    description: "The name of a cat",
    example: "Kitty",
  })
  name: string;

  @Prop()
  @ApiProperty({
    description: "The age of a cat",
    example: 4,
  })
  age: number;

  @Prop()
  @ApiProperty({
    description: "The breed of a cat",
    example: "Persian",
  })
  breed: string;
}

export const CatSchema = SchemaFactory.createForClass(Cat);
