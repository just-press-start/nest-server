import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiConsumes, ApiCookieAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { ClaimPlotDto } from './dtos/claimPlotDto';
import { EditPlotDto } from './dtos/editPlotDto';
import { PlotsService } from './plots.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '../../../config/multer';
import { UserGuard } from '../../../helpers/guards/user.guard';

@ApiTags('plots')
@Controller('islands/:islandId/plots')
export class PlotsController {
  constructor(private readonly plotsService: PlotsService) {}

  @Post('/:plotId/claim-plot')
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
    @Res() response,
    @Param('islandId') islandId,
    @Param('plotId') plotId,
    @Body() claimPlotDto: ClaimPlotDto,
  ) {
    const updatedIsland = await this.plotsService.claimPlot(
      islandId,
      plotId,
      claimPlotDto,
    );
    return response.status(HttpStatus.OK).json({
      updatedIsland,
    });
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
  @UseGuards(UserGuard)
  @UseInterceptors(FilesInterceptor('img', null, multerOptions))
  async editPlot(
    @Res() response,
    @Param('islandId') islandId,
    @Param('plotId') plotId,
    @UploadedFiles() img,
    @Body() editPlotDto: EditPlotDto,
  ) {
    const updatedIsland = await this.plotsService.editPlot(
      islandId,
      plotId,
      editPlotDto,
      img,
    );
    return response.status(HttpStatus.OK).json({
      updatedIsland,
    });
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
  async getPlot(
    @Res() response,
    @Param('islandId') islandId,
    @Param('plotId') plotId,
  ) {
    const plot = await this.plotsService.getPlot(islandId, plotId);
    return response.status(HttpStatus.OK).json(plot);
  }
}
