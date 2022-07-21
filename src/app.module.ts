import { Module } from '@nestjs/common';
import { WorldsModule } from './worlds/worlds.module';
import { IslandsModule } from './islands/islands.module';
import { IslandPlotsModule } from './islandPlots/islandPlots.module';
import { ContentsModule } from './contents/contents.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    WorldsModule,
    IslandsModule,
    IslandPlotsModule,
    ContentsModule,
    UsersModule,
  ],
})
export class AppModule {}
