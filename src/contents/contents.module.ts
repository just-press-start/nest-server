import { ImagesController } from './images/images.controller';
import { ImagesService } from './images/images.service';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Content, ContentSchema } from './schemas/content.schema';
import { ContentsController } from './contents.controller';
import { ContentsService } from './contents.service';
import { BlogService } from './blog/blog.service';
import { BlogController } from './blog/blog.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.env.NODE_ENV}.env`,
    }),
    MongooseModule.forRoot(process.env.DATABASE_URI),
    MongooseModule.forFeature([{ name: Content.name, schema: ContentSchema }]),
  ],
  controllers: [ContentsController, BlogController, ImagesController],
  providers: [ContentsService, BlogService, ImagesService],
})
export class ContentsModule {}
