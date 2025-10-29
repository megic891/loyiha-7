import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './module/module/auth.module';
import { UserModule } from './user/user.module';
import { APP_FILTER, APP_GUARD, APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from './validator/validation.pipe';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from './shared/entities/auth.entity';
import { User } from './shared/entities/user.entity';
import { AllExceptionsFilter } from './filter/all-exeption.filter';
import { UploadModule } from './module/module/upload/upload.module';
import { PostModule } from './module/module/post/post.module';
import { CommentModule } from './module/module/comment/comment.module'

@Module({
  imports: [

    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),

    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 100,
        },
      ],
    }),

 
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1105',
      database: 'loyiha',
      entities: [Auth, User],
      synchronize: true, 
      autoLoadEntities: true,
      logging: false,
    }),

   
    AuthModule,
    UserModule,
    UploadModule,
    PostModule,
    CommentModule
  ],

  controllers: [],

  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
      {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
   
  ],
})
export class AppModule {}