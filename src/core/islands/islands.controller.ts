import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, Req, Res } from '@nestjs/common';
import { ApiParam, ApiProperty, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { Island } from 'src/schemas/island.schema';
import { IslandsService } from './islands.service';


@ApiTags('islands')
@Controller('islands')
export class IslandsController {
    constructor(private readonly islandsService: IslandsService) { }

    @Post()
    async createIsland(@Res() response, @Body() islandDto: Island) {
        const newIsland = await this.islandsService.create(islandDto);
        return response.status(HttpStatus.CREATED).json({
            newIsland,
        });
    }

    @Get()
    async getIslands(@Res() response: Response): Promise<Response> {
        const island = await this.islandsService.findAll();
        return response.status(200).json(island)
    }

    @Get('/:id')
    @ApiParam({ name: 'id', required: true, description: 'island object id' })
    async getIsland(@Res() response: Response, @Param('id') id): Promise<Response> {
        const island = await this.islandsService.findById(id);
        return response.status(200).json(island)

    }

    @Put('/:id')
    @ApiParam({ name: 'id', required: true, description: 'island object id' })
    async update(@Res() response, @Param('id') id, @Body() island: Island): Promise<Response> {
        const updatedIsland = await this.islandsService.update(id, island);
        return response.status(HttpStatus.OK).json({
            updatedIsland,
        });
    }

    @Delete('/:id')
    @ApiParam({ name: 'id', required: true, description: 'island object id' })
    async delete(@Res() response, @Param('id') id): Promise<Response> {
        const deletedIsland = await this.islandsService.delete(id);
        return response.status(HttpStatus.OK).json({
            deletedIsland,
        });
    }


}


