import { Content, ContentSchema } from 'src/schemas/content.schema';
import { Module } from '@nestjs/common';
import { IslandsController } from './islands/islands.controller';
import { IslandsService } from './islands/islands.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { Island, IslandSchema } from 'src/schemas/island.schema';
import { PlotsController } from './islands/islandPlots/plots.controller';
import { PlotsService } from './islands/islandPlots/plots.service';
import { ContentsController } from './plot/content.controller';
import { ContentsService } from './plot/content.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.env.NODE_ENV}.env`,
    }),
    MongooseModule.forRoot(process.env.DATABASE_URI),
    MongooseModule.forFeature([{ name: Island.name, schema: IslandSchema }]),
    MongooseModule.forFeature([{ name: Content.name, schema: ContentSchema }]),
  ],
  controllers: [
    IslandsController,
    PlotsController,
    ContentsController
  ],
  providers: [
    IslandsService,
    PlotsService,
    ContentsService
  ],
})
export class CoreModule { }
