import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserController } from './modules/userModule/controllers/user.controller';
import { TopicController } from './modules/generatorModule/controllers/topic.controller';

import { UserService } from './modules/userModule/services/user.service';
import { TopicService } from './modules/generatorModule/services/topic.service';

import { User, UserSchema } from './schemas/user.schema';
import { Topic, TopicSchema } from './schemas/topic.schema';
import { CategoryController } from './modules/generatorModule/controllers/category.controller';
import { CategoryService } from './modules/generatorModule/services/category.service';
import { Category, CategorySchema } from './schemas/category.schema';
import { GeneratorModule } from './modules/generatorModule/generator.module';

@Module({
  imports: [
    GeneratorModule,
    MongooseModule.forRoot('mongodb://localhost/100-things'),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule {}
