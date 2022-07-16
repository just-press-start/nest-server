import { Content, ContentSchema } from 'src/schemas/content.schema';
import { Module } from '@nestjs/common';
import { IslandsController } from './islands/islands.controller';
import { IslandsService } from './islands/islands.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { Island, IslandSchema } from 'src/schemas/island.schema';
import { PlotsController } from './islands/plots/plots.controller';
import { PlotsService } from './islands/plots/plots.service';
import { ContentsController } from './contents/contents.controller';
import { ContentsService } from './contents/contents.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { User, UserSchema } from '../schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { UserGuard } from '../helpers/guards/user.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.env.NODE_ENV}.env`,
    }),
    MongooseModule.forRoot(process.env.DATABASE_URI),
    MongooseModule.forFeature([{ name: Island.name, schema: IslandSchema }]),
    MongooseModule.forFeature([{ name: Content.name, schema: ContentSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [
    IslandsController,
    PlotsController,
    ContentsController,
    UsersController,
  ],
  providers: [
    IslandsService,
    PlotsService,
    ContentsService,
    UsersService,
    {
      provide: UserGuard,
      useClass: UserGuard,
    },
  ],
})
export class CoreModule {}
