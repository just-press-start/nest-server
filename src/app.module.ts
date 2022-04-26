import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { ProductController } from './controllers/product.controller';
import { Product, ProductSchema } from './schemas/product.schema';
import { ProductService } from './services/product.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/demo'),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  controllers: [AppController, ProductController],
  providers: [AppService, ProductService],
})
export class AppModule {}
