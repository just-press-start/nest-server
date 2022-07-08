import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";

@Schema()
export class Plot {
    @Prop()
    @ApiProperty()
    name: string;

    @Prop()
    @ApiProperty()
    color: string;

    @Prop()
    @ApiProperty()
    user_name: string;
}

export const PlotSchema = SchemaFactory.createForClass(Plot);