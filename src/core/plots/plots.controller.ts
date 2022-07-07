import { Body, Controller, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { IslandPlot } from 'src/schemas/islandPlot.schema';
import { Plot } from 'src/schemas/plot.schema';
import { ClaimPlotDto } from './dtos/claimPlotDto';
import { PlotsService } from './plots.service';

@ApiTags('plots')
@Controller(
    'islands/:islandId/plots',
)
export class PlotsController {
    constructor(private readonly plotsService: PlotsService) { }

    @Post('/:plotId/claim-plot')
    @ApiParam({ name: 'plotId', required: true, description: 'plot object id' })
    @ApiParam({ name: 'islandId', required: true, description: 'island object id' })
    async claimPlot(@Res() response, @Param('islandId') islandId, @Param('plotId') plotId, @Body() claimPlotDto: ClaimPlotDto) {
        const updatedIsland = await this.plotsService.claimPlot(islandId, plotId, claimPlotDto);
        return response.status(HttpStatus.OK).json({
            updatedIsland,
        });
    }
}
