import { ApiProperty } from '@nestjs/swagger';

export class WorldDto {
  @ApiProperty({ example: 'biggest worlds' })
  name: string;

  @ApiProperty({ example: 'img.png' })
  img: string;

  @ApiProperty({ example: '10' })
  sideLength: number;

  @ApiProperty({ example: '3' })
  islandCount: number;
}
