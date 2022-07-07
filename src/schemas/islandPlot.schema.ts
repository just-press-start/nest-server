import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";

@Schema()
export class IslandPlot {
    @Prop({ default: null })
    @ApiProperty()
    name: string;

    @Prop({ default: null })
    @ApiProperty()
    color: string;

    @Prop({ default: null })
    @ApiProperty()
    user_name: string;
}

export const IslandPlotSchema = SchemaFactory.createForClass(IslandPlot);