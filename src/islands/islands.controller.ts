import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { Island } from 'src/islands/schemas/island.schema';
import { IslandsService } from './islands.service';
import { IslandGetDto } from './models/dto/IslandGetDto';
import { IslandsGetDto } from './models/dto/IslandsGetDto';

@ApiTags('islands')
@Controller('islands')
export class IslandsController {
  constructor(private readonly islandsService: IslandsService) {}

  //TODO: add return types without Res.
  @Get()
  async getIslands(): Promise<IslandsGetDto> {
    return this.islandsService.findAll();
  }

  @Get('/:id')
  @ApiParam({ name: 'id', required: true, description: 'island object id' })
  async getIsland(@Param('id') id): Promise<IslandGetDto> {
    return this.islandsService.findById(id);
  }

  @Put('/:id')
  @ApiParam({ name: 'id', required: true, description: 'island object id' })
  async update(@Param('id') id, @Body() island: Island): Promise<IslandGetDto> {
    return this.islandsService.update(id, island);
  }

  @Delete('/:id')
  @ApiParam({ name: 'id', required: true, description: 'island object id' })
  async delete(@Param('id') id): Promise<any> {
    return this.islandsService.delete(id);
  }

  @Delete()
  async deleteAll(): Promise<any> {
    return this.islandsService.deleteAll();
  }
}
