import { Prop } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";

export class EditPlotDto {
    @Prop()
    @ApiProperty()
    name: string;

    @Prop()
    @ApiProperty()
    color: string;
}