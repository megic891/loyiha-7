import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { Auth } from './auth/auth.model';
import { UserModule } from './user/user.module';
import { user } from './user/user.model';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from './validator/validation.pipe';
import {ThrottlerGuard, ThrottlerModule} from '@nestjs/throttler'
import { RolesGuard } from './auth/role.guard';
import { SequelizeModule } from '@nestjs/sequelize';
@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 100,
        },
      ],
    }),
  ConfigModule.forRoot({envFilePath: ".env", isGlobal: true}),
  SequelizeModule.forRoot({
    dialect: "postgres",
    username: "postgres",
    host: "localhost",
    password: "1105",
    port: 5432,
    database: "loyiha",
    models: [Auth, user],
    synchronize: true,
    logging : false

  }),
  AuthModule,
  UserModule
],
  
  controllers: [],
     providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },

{
  provide: APP_GUARD,
  useClass: ThrottlerGuard
},
  {
    provide: APP_GUARD,
    useClass: RolesGuard,
  },

 
],

  
})
export class AppModule {}
