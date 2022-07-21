import { ContentsService } from './contents.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { UpsertContentDto } from './models/dtos/upsertContentDto';
import { Response } from 'express';

@ApiTags('contents')
@Controller('contents')
export class ContentsController {
  constructor(private readonly contentsService: ContentsService) {}

  @Post('/:plotId')
  @ApiParam({
    name: 'plotId',
    required: true,
    description: 'contents object id',
  })
  async upsertContent(
    @Res() response: Response,
    @Param('plotId') plotId,
    @Body() upsertContentDto: UpsertContentDto,
  ) {
    const newContent = await this.contentsService.upsertContent(
      plotId,
      upsertContentDto,
    );
    return response.status(HttpStatus.CREATED).json({
      newContent,
    });
  }

  @Get()
  async findAll(@Res() response: Response) {
    const plots = await this.contentsService.findAll();
    return response.status(HttpStatus.CREATED).json(plots);
  }

  @Get('/:plotId')
  @ApiParam({
    name: 'plotId',
    required: true,
    description: 'contents object id',
  })
  async findByPlotId(@Param('plotId') plotId, @Res() response: Response) {
    const plots = await this.contentsService.findByPlotId(plotId);
    return response.status(HttpStatus.CREATED).json(plots);
  }

  @Delete()
  async deleteAll(@Res() response: Response) {
    const plots = await this.contentsService.deleteAll();
    return response.status(HttpStatus.CREATED).json(plots);
  }
}
