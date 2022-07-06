import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import { Plot, PlotSchema } from './plot.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  findByName: Function;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  profilePicture: string;

  @Prop({ type: [PlotSchema] })
  plots: Plot[];
}

export const UserSchema = SchemaFactory.createForClass(User);

/*
UserSchema.methods.findByName = async function (name: string): Promise<string> {
  const userModel: Model<UserDocument>;
  console.log("doruk")
  return name;
};
 */
