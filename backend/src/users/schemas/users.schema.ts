import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { ApiProperty } from "@nestjs/swagger";

@Schema()
export class User {
    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true
    })
    @ApiProperty({
        description: "ID of a user. This property is automatically created.",
        example: "664da67d075cdd1e0f0a9851",
    })
    userId: mongoose.Types.ObjectId;

    @Prop({
        type: String,
        required: true,
    })
    @ApiProperty({
        description: "Name of a user",
        example: "Dijkstra"
    })
    userName: string;

    @Prop({ lowercase: true, unique: true })
    @ApiProperty({
        description: "Email of a user",
        example: "dijkstra@gmail.com"
    })
    email: string;

    @Prop({ select: false })
    @ApiProperty({
        description: "Password of a user",
        example: "!@#$%^&*()"
    })
    password: string;
}

export type UserDocument = HydratedDocument<User>;

export const UserSchema = SchemaFactory.createForClass(User);