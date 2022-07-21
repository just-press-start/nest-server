import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { IslandsController } from './islands.controller';
import { IslandsService } from './islands.service';
import { Island, IslandSchema } from './schemas/island.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.env.NODE_ENV}.env`,
    }),
    MongooseModule.forRoot(process.env.DATABASE_URI),
    MongooseModule.forFeature([{ name: Island.name, schema: IslandSchema }]),
  ],
  controllers: [IslandsController],
  providers: [IslandsService],
})
export class IslandsModule {}
