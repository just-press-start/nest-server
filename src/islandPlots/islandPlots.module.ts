import { Module } from '@nestjs/common';
import { IslandPlotsController } from './islandPlots.controller';
import { IslandPlotsService } from './islandPlots.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Island, IslandSchema } from '../islands/schemas/island.schema';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.env.NODE_ENV}.env`,
    }),
    MongooseModule.forRoot(process.env.DATABASE_URI),
    MongooseModule.forFeature([{ name: Island.name, schema: IslandSchema }]),
  ],
  controllers: [IslandPlotsController],
  providers: [IslandPlotsService, JwtService],
})
export class IslandPlotsModule {}
