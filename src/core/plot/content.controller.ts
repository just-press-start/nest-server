import { ContentsService } from './content.service';
import { Body, Controller, Get, Param, Post, Res, HttpStatus, Delete } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { InitContentDto } from './dtos/initContentDto';
import { Request, Response } from 'express';

@ApiTags('contents')
@Controller('contents')
export class ContentsController {
    constructor(private readonly contentsService: ContentsService) {

    }

    @Post('/:plotId')
    @ApiParam({ name: 'plotId', required: true, description: 'plot object id' })
    async initContent(@Res() response: Response, @Param('plotId') plotId, @Body() initContentDto: InitContentDto) {
        const newContent = await this.contentsService.initContent(plotId, initContentDto)
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
