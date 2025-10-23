import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { user } from './user.model';

@Module({
imports: [SequelizeModule.forFeature([user])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}


