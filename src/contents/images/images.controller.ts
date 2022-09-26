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
import { ImagesService } from './images.service';
import { ApiConsumes, ApiParam, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AddPhotoDto } from './dtos/addPhotoDto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '../../config/multer';

@ApiTags('images')
@Controller('contents/:plotId/images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post('/add-photo')
  @ApiConsumes('multipart/form-data')
  @ApiParam({
    name: 'plotId',
    required: true,
    description: 'plot object id',
  })
  @UseInterceptors(FilesInterceptor('img', null, multerOptions))
  async addPhoto(
    @Param('plotId') plotId,
    @UploadedFiles() img,
    @Body()
    addPhotoDto: AddPhotoDto,
  ) {
    return this.imagesService.addPhoto(plotId, addPhotoDto, img);
  }
}
