import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Content, ContentSchema } from './content.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: [ContentSchema] })
  plots: Content[];
}

export const UserSchema = SchemaFactory.createForClass(User);

/*
UserSchema.methods.findByName = async function (name: string): Promise<string> {
  const userModel: Model<UserDocument>;
  console.log("doruk")
  return name;
};
 */
