import { ApiProperty } from '@nestjs/swagger';
import { IslandPlot } from '../IslandPlot';

export class IslandDto {
  @ApiProperty({ example: 'biggest island' })
  name: string;

  @ApiProperty({ example: 'img.png' })
  img: string;

  plots?: IslandPlot[];
  sideLength?: number;
}
