import { IslandPlotsRepository } from './islandPlots.repository';
import { ContentSchema } from './../contents/schemas/content.schema';
import { Module } from '@nestjs/common';
import { IslandPlotsController } from './islandPlots.controller';
import { IslandPlotsService } from './islandPlots.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Island, IslandSchema } from '../islands/schemas/island.schema';
import { JwtService } from '@nestjs/jwt';
import { Content } from 'src/contents/schemas/content.schema';

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
  controllers: [IslandPlotsController],
  providers: [IslandPlotsService, JwtService, IslandPlotsRepository],
})
export class IslandPlotsModule {}
