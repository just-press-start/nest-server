import { Body, Controller, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { ClaimPlotDto } from './dtos/claimPlotDto';
import { EditPlotDto } from './dtos/editPlotDto';
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

    //TODO: add jwt middleware here which gives user credentials, we need to check if username equality. 
    @Post('/:plotId/edit-plot')
    @ApiParam({ name: 'plotId', required: true, description: 'plot object id' })
    @ApiParam({ name: 'islandId', required: true, description: 'island object id' })
    async editPlot(@Res() response, @Param('islandId') islandId, @Param('plotId') plotId, @Body() editPlotDto: EditPlotDto) {
        const updatedIsland = await this.plotsService.editPlot(islandId, plotId, editPlotDto);
        return response.status(HttpStatus.OK).json({
            updatedIsland,
        });
    }
}
