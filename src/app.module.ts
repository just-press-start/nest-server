import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './controllers/app.controller';
import { UserController } from './controllers/user.controller';
import { TopicController } from './controllers/topic.controller';

import { AppService } from './services/app.service';
import { UserService } from './services/user.service';
import { TopicService } from './services/topic.service';

import { User, UserSchema } from './schemas/user.schema';
import { Topic, TopicSchema } from './schemas/topic.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/demo'),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Topic.name, schema: TopicSchema },
    ]),
  ],
  controllers: [AppController, UserController, TopicController],
  providers: [AppService, UserService, TopicService],
})
export class AppModule {}
