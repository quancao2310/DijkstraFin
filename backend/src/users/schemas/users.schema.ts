import mongoose from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";

@Schema({
  toJSON: {
    transform(doc, ret) {
      delete ret.password;
    },
  },
})
export class User {
  @Prop({
    type: String,
    required: true,
  })
  @ApiProperty({
    description: "Name of a user",
    example: "Dijkstra",
  })
  name: string;

  @Prop({
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  })
  @ApiProperty({
    description: "Email of a user",
    example: "dijkstra@gmail.com",
  })
  email: string;

  @Prop({
    type: String,
    required: true,
  })
  @ApiProperty({
    description: "Hashed password of a user",
    example: "!@#$%^&*()",
  })
  password: string;
}

export type UserDocument = mongoose.HydratedDocument<User>;

export const UserSchema = SchemaFactory.createForClass(User);
