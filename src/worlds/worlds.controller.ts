import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { WorldsService } from './worlds.service';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { WorldDto } from './models/dto/WorldDto';
import { WorldGetDto } from './models/dto/WorldGetDto';
import { WorldsGetDto } from './models/dto/WorldsGetDto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/config/multer';

@ApiTags('worlds')
@Controller('worlds')
export class WorldsController {
  constructor(private readonly worldService: WorldsService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('img', null, multerOptions))
  async createWorld(
    @UploadedFiles() img,
    @Body() body: WorldDto,
  ): Promise<WorldGetDto> {
    return this.worldService.createWorld(body, img);
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
