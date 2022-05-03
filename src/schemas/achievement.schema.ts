import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Achievement extends Document {
  @Prop()
  name: string;

  @Prop()
  image: string;
}

export const AchievementSchema = SchemaFactory.createForClass(Achievement);
