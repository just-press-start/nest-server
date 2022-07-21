import { Module } from '@nestjs/common';
import { WorldModule } from './world/world.module';
import { IslandsModule } from './islands/islands.module';
import { IslandPlotsModule } from './islandPlots/islandPlots.module';
import { ContentsModule } from './contents/contents.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    WorldModule,
    IslandsModule,
    IslandPlotsModule,
    ContentsModule,
    UsersModule,
  ],
})
export class AppModule {}
