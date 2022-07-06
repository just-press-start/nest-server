import { Module } from '@nestjs/common';
import { GeneratorModule } from './modules/generatorModule/generator.module';
import { CoreModule } from './core/core.module';

@Module({
  imports: [GeneratorModule, CoreModule],
})
export class AppModule {}
