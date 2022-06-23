import { Module } from '@nestjs/common';
import { GeneratorModule } from './modules/generatorModule/generator.module';

@Module({
  imports: [GeneratorModule],
})
export class AppModule {}
