import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { WorldModule } from './world/world.module';

@Module({
  imports: [CoreModule, WorldModule],
})
export class AppModule {}
