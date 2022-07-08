import { Module } from '@nestjs/common';
import { IslandsController } from './islands/islands.controller';
import { IslandsService } from './islands/islands.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { Island, IslandSchema } from 'src/schemas/island.schema';
import { IslandPlotsController } from './islands/islandPlots/islandPlots.controller';
import { IslandPlotsService } from './islands/islandPlots/islandPlots.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.env.NODE_ENV}.env`,
    }),
    MongooseModule.forRoot(process.env.DATABASE_URI),
    MongooseModule.forFeature([{ name: Island.name, schema: IslandSchema }]),
  ],
  controllers: [
    IslandsController,
    IslandPlotsController
  ],
  providers: [
    IslandsService,
    IslandPlotsService
  ],
})
export class CoreModule { }
