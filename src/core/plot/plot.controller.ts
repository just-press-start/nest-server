import { PlotService } from './plot.service';
import { Body, Controller, Get, Param, Post, Res, HttpStatus, Delete } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { InitializePlotDto } from './dtos/initializePlotDto';
import { Request, Response } from 'express';

@ApiTags('plot')
@Controller('plot')
export class PlotController {
    constructor(private readonly plotService: PlotService) {

    }

    @Post('/:plotId')
    @ApiParam({ name: 'plotId', required: true, description: 'plot object id' })
    async initializePlot(@Res() response: Response, @Param('plotId') plotId, @Body() initializePlotDto: InitializePlotDto) {
        const newPlot = await this.plotService.initializePlot(plotId, initializePlotDto)
        return response.status(HttpStatus.CREATED).json({
            newPlot,
        });
    }

    @Get()
    async findAll(@Res() response: Response) {
        const plots = await this.plotService.findAll();
        return response.status(HttpStatus.CREATED).json(plots);
    }

    @Delete()
    async deleteAll(@Res() response: Response) {
        const plots = await this.plotService.deleteAll();
        return response.status(HttpStatus.CREATED).json(plots);
    }
}
