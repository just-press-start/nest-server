import {
  Body,
  Controller,
  HttpStatus,
  Param,
  Post,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ApiConsumes, ApiParam, ApiTags } from '@nestjs/swagger';
import { ClaimPlotDto } from './dtos/claimPlotDto';
import { EditPlotDto } from './dtos/editPlotDto';
import { PlotsService } from './plots.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '../../../config/multer';

@ApiTags('plots')
@Controller('islands/:islandId/plots')
export class PlotsController {
  constructor(private readonly plotsService: PlotsService) {}

  @Post('/:plotId/claim-contents')
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
  @Post('/:plotId/edit-contents')
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
}
