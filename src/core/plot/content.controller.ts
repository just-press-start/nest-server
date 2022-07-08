import { ContentsService } from './content.service';
import { Body, Controller, Get, Param, Post, Res, HttpStatus, Delete } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { UpsertContentDto } from './dtos/upsertContentDto';
import { Request, Response } from 'express';

@ApiTags('contents')
@Controller('contents')
export class ContentsController {
    constructor(private readonly contentsService: ContentsService) {

    }

    @Post('/:plotId')
    @ApiParam({ name: 'plotId', required: true, description: 'plot object id' })
    async upsertContent(@Res() response: Response, @Param('plotId') plotId, @Body() upsertContentDto: UpsertContentDto) {
        const newContent = await this.contentsService.upsertContent(plotId, upsertContentDto)
        return response.status(HttpStatus.CREATED).json({
            newContent,
        });
    }

    @Get()
    async findAll(@Res() response: Response) {
        const plots = await this.contentsService.findAll();
        return response.status(HttpStatus.CREATED).json(plots);
    }

    @Delete()
    async deleteAll(@Res() response: Response) {
        const plots = await this.contentsService.deleteAll();
        return response.status(HttpStatus.CREATED).json(plots);
    }
}
