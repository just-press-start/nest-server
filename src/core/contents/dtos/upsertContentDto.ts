import { Prop } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import mongoose from "mongoose";

export class UpsertContentDto {
    @Prop()
    _id: mongoose.Schema.Types.ObjectId;

    @Prop()
    @ApiProperty()
    name: string;

    @Prop()
    @ApiProperty()
    //TODO: add enum here
    type: string;
}