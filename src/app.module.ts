import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule} from '@nestjs/sequelize'
import { AuthModule } from './auth/auth.module';
import { Auth } from './auth/auth.model';
import { UserModule } from './user/user.module';
import { user } from './user/user.model';
@Module({
  imports: [
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
    autoLoadModels: true,
    logging : false

  }),
  AuthModule,
  UserModule
],
  
  controllers: [],
  providers: [],
})
export class AppModule {}
