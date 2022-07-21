import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { WorldService } from './world.service';
import { ApiTags } from '@nestjs/swagger';
import { WorldDto } from './models/dto/WorldDto';
import { WorldGetDto } from './models/dto/WorldGetDto';

@ApiTags('world')
@Controller('world')
export class WorldController {
  constructor(private readonly worldService: WorldService) {}

  @Post()
  async createWorld(@Body() body: WorldDto): Promise<WorldGetDto> {
    return this.worldService.createWorld(body);
  }

  @Get('/:id')
  async getWorldById(@Param('id') id: string): Promise<WorldGetDto> {
    return this.worldService.getWorldById(id);
  }
}
