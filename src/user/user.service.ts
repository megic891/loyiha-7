import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UpdateUserDto } from './dto/update-user.dto';
import { user } from './user.model';
import { CreateUserDto } from './dto/create-user.dto'
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
    constructor(@InjectModel(user) private userModel: typeof user) {}
   async create(CreateUserDto:CreateUserDto  ) {
    const {usernmae, email, password,age, img} = CreateUserDto
    await this.userModel.create({usernmae, email, password,age, img})
        return {message: "created"}
    }

    async findAll() {
        return this.userModel.findAll();
    }

    async findOne(id: number) {
        const  user = await this.userModel.findByPk(+id)
        if(!user) throw new NotFoundException("user not found")
        return user
    }


 async update(id: number, dto: UpdateUserDto) {
  const user = await this.userModel.findByPk(+id);
  if (!user) throw new NotFoundException('User not found');
  const updateData: any = { ...dto };
  if (dto.password) {
    updateData.password = await bcrypt.hash(dto.password, 10);
  }
  await this.userModel.update(updateData, { where: { id: +id } });
  const updated = await this.userModel.findByPk(+id);
  return updated;
}



    async remove (id: number ) {
        const user = await this.userModel.findByPk(+id)
       if(!user) throw new NotFoundException("user not found ")
        await  this.userModel.destroy({where:{id: +id}})
        return {message: "Delete user"}
    }
}
