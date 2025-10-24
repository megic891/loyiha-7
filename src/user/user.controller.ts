import { Body, Controller,Delete,Get,Param,Patch,Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/role.decorator';
import { Role } from 'src/enum/role.enum';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
    @Post()
  async create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @Get()
  @UseGuards(AuthGuard)
  @Roles(Role.Admin, Role.User)
  findAll() {
    return this.userService.findAll()
  }

  @Get()
  findOne(@Param('id')id: string) {
    return this.userService.findOne(+id)
  }


  @Patch("id")
  update(@Param("id") id: string,@Body() UpdateUserDto: UpdateUserDto) {
  return this.userService.update(+id, UpdateUserDto)
  }

   @Delete()
  remove(@Param('id')id: string) {
    return this.userService.remove(+id)
  }
}










