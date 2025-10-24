import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { user } from './user.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
imports: [SequelizeModule.forFeature([user]),AuthModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}  





