import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { WorldsService } from './worlds.service';
import { ApiTags } from '@nestjs/swagger';
import { WorldDto } from './models/dto/WorldDto';
import { WorldGetDto } from './models/dto/WorldGetDto';
import { WorldsGetDto } from './models/dto/WorldsGetDto';

@ApiTags('worlds')
@Controller('worlds')
export class WorldsController {
  constructor(private readonly worldService: WorldsService) {}

  @Post()
  async createWorld(@Body() body: WorldDto): Promise<WorldGetDto> {
    return this.worldService.createWorld(body);
  }

  @Get()
  async getWorlds(): Promise<WorldsGetDto> {
    return this.worldService.getWorlds();
  }

  @Get('/:id')
  async getWorldById(@Param('id') id: string): Promise<WorldGetDto> {
    return this.worldService.getWorldById(id);
  }

  @Delete('/:id')
  async deleteIsland(@Param('id') id: string): Promise<any> {
    return this.worldService.deleteWorld(id);
  }

  @Delete()
  async deleteAll(): Promise<any> {
    return this.worldService.deleteWorlds();
  }
}
