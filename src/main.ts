import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cookieParser());
  app.enableCors({ origin: 'http://localhost:3333', credentials: true });
  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('PORT');

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Island Generator')
    .addCookieAuth('jwt', null, 'jwt')
    .setDescription('Island contents claiming API description.')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/', app, document);
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });
  await app.listen(PORT);
}
bootstrap();
