import { Module } from '@nestjs/common';
import { IslandsController } from './islands/islands.controller';
import { IslandsService } from './islands/islands.service';

@Module({
  controllers: [IslandsController],
  providers: [IslandsService]
})
export class CoreModule {}
