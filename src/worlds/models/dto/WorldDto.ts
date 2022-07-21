import { ApiProperty } from '@nestjs/swagger';

export class WorldDto {
  @ApiProperty({ example: 'biggest world' })
  name: string;

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

  @ApiProperty({ example: '2' })
  sideLength: number;

  @ApiProperty({ example: '2' })
  islandCount: number;
}
