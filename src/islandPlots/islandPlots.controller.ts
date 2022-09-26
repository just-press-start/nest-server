import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  Put,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiConsumes, ApiCookieAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { ClaimPlotDto } from './models/dtos/claimPlotDto';
import { EditPlotDto } from './models/dtos/editPlotDto';
import { IslandPlotsService } from './islandPlots.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '../config/multer';
import { UserGuard } from '../helpers/guards/user.guard';

@ApiTags('plots')
@Controller('islands/:islandId/plots')
export class IslandPlotsController {
  constructor(private readonly plotsService: IslandPlotsService) {}

  @Put('/:plotId/claim-plot')
  @ApiParam({
    name: 'plotId',
    required: true,
    description: 'contents object id',
  })
  @ApiParam({
    name: 'islandId',
    required: true,
    description: 'island object id',
  })
  async claimPlot(
    @Param('islandId') islandId,
    @Param('plotId') plotId,
    @Body() claimPlotDto: ClaimPlotDto,
  ) {
    return this.plotsService.claimPlot(islandId, plotId, claimPlotDto);
  }

  //TODO: add jwt middleware here which gives user credentials, we need to check if username equality.
  @Post('/:plotId/edit-plot')
  @ApiConsumes('multipart/form-data')
  @ApiParam({
    name: 'plotId',
    required: true,
    description: 'contents object id',
  })
  @ApiParam({
    name: 'islandId',
    required: true,
    description: 'island object id',
  })
  @ApiCookieAuth('jwt')
  //@UseGuards(UserGuard)
  @UseInterceptors(FilesInterceptor('img', null, multerOptions))
  async editPlot(
    @Param('islandId') islandId,
    @Param('plotId') plotId,
    @UploadedFiles() img,
    @Body() editPlotDto: EditPlotDto,
  ) {
    return this.plotsService.editPlot(islandId, plotId, editPlotDto, img);
  }

  @Get('/:plotId')
  @ApiParam({
    name: 'plotId',
    required: true,
    description: 'contents object id',
  })
  @ApiParam({
    name: 'islandId',
    required: true,
    description: 'island object id',
  })
  async getPlot(@Param('islandId') islandId, @Param('plotId') plotId) {
    return this.plotsService.getPlot(islandId, plotId);
  }
}
