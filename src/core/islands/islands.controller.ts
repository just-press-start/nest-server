import { Controller, Get, Param, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { IslandsService } from './islands.service';

@Controller('islands')
export class IslandsController {
    constructor(private readonly islandsService: IslandsService){}
    @Get()
    getIslands(@Req() request: Request, @Res() response: Response){
        const island = this.islandsService.getIslands();
        return response.status(200).json(island)
    }

    @Get('/:id')
    getIsland(@Req() request: Request, @Res() response: Response, @Param('id') id){
        if(id){
            const island = this.islandsService.getIsland(id);
            return response.status(200).json(island)
        }else{
            
            return response.status(400).send({'msg': 'You should give pagination options.'})

        }
    }
}
