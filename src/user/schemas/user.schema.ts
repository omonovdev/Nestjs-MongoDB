import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true, versionKey: false })
export class User {
    @Prop()
    name: string;

    @Prop()
    phone_number: string;

    @Prop({ type: Types.ObjectId, ref:'Admin' })
    adminId: string;

}
export const UserSchema = SchemaFactory.createForClass(User);
