import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class Plot {
  @Prop()
  i: number;

  @Prop()
  j: number;

  @Prop()
  isClaimable: boolean;

  @Prop()
  @ApiProperty({
    type: 'file',
    properties: {
      file: {
        type: 'string',
        format: 'binary',
      },
    },
  })
  img: string;
}

export const IslandPlotSchema = SchemaFactory.createForClass(Plot);
