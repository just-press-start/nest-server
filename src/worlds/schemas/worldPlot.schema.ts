import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class WorldPlot {
  @Prop()
  name: string;

  @Prop()
  img: string;

  @Prop()
  isIsland: boolean;
}

export const WorldPlotSchema = SchemaFactory.createForClass(WorldPlot);
