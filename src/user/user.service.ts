import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto'
import { Repository } from 'typeorm';
import { User } from 'src/shared/entities/user.entity';

@Injectable()
export class UserService {
    userPepo: any;
    userRepo: any;
    constructor(@InjectModel(User) private userModel: Repository<User>) {}


   async create(CreateUserDto:CreateUserDto  ) {
    const {usernmae, email, password,age, img} = CreateUserDto
    const user = this.userPepo.create({ usernmae, email, password, age, img })
        return this.userPepo.save(user)
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find();
    }

    async findOne(id: number): Promise<User> {
        const  user = await this.userRepo.findOneBy({id:+id})
        if(!user) throw new NotFoundException("user not found")
        return user
    }


 async update(id: number, dto: UpdateUserDto) : Promise<{message: string}>{
  const user = await this.userRepo.findOneBy(+id);
  if (!user) throw new NotFoundException('User not found');
  const updateData: any = { ...dto };
  if (dto.password) {

  }
  await this.userRepo.update(id,updateData);
  const updated = await this.userRepo.findOneBy({id:+id});
  return updated;
}



    async remove (id: number ): Promise<{message: string}> {
        const user = await this.userRepo.findOneBy({id:+id})
       if(!user) throw new NotFoundException("user not found ")
        await  this.userRepo.remove(user)
        return {message: "Delete user"}
    }
}
