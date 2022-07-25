import { Module } from '@nestjs/common';
import { WorldsController } from './worlds.controller';
import { WorldsService } from './worlds.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { World, WorldSchema } from './schemas/world.schema';
import { WorldsJobs } from './worlds.jobs';
import { ScheduleModule } from '@nestjs/schedule';
import { Island, IslandSchema } from '../islands/schemas/island.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.env.NODE_ENV}.env`,
    }),
    MongooseModule.forRoot(process.env.DATABASE_URI),
    MongooseModule.forFeature([{ name: World.name, schema: WorldSchema }]),
    MongooseModule.forFeature([{ name: Island.name, schema: IslandSchema }]),
    ScheduleModule.forRoot(),
  ],
  controllers: [WorldsController],
  providers: [WorldsService, WorldsJobs],
})
export class WorldsModule {}
