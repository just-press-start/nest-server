import { Body, Controller, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { BlogService } from 'src/contents/blog/blog.service';
import { Response } from 'express';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dtos/createPostDto';

@ApiTags('blog')
@Controller('contents/:plotId/blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post('/create-post')
  @ApiParam({
    name: 'plotId',
    required: true,
    description: 'plot object id',
  })
  async createPost(
    @Param('plotId') plotId,
    @Body()
    createPostDto: CreatePostDto,
    @Res() response: Response,
  ) {
    const createdPost = this.blogService.createPost(plotId, createPostDto);
    return response.status(HttpStatus.CREATED).json({
      createdPost,
    });
  }
}
