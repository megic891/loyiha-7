import {
  Body,
  Controller,
  Delete,
  Get,
  Injectable,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { UpdateUserDto } from "./dto/update-user.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { Role } from "src/enum/role.enum";
import { AuthGuard } from "src/shared/guards/guards/auth.guard";
import { Roles } from "src/shared/decorators/role.decorator";
import { Auth } from "src/shared/entities/auth.entity";
import { RolesGuard } from "src/shared/guards/guards/role.guard";
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { UserService } from "./user.service";
@Controller()
@Roles(Role.Admin, Role.User)
@UseGuards(Auth, RolesGuard)
@ApiBearerAuth("JWT-auth")
@ApiTags("User")
@ApiResponse({ status: 201, description: "Create user" })
export class UserController {
  userService: any;
  constructor(private readonlyuserService: UserService) {}
  @ApiOperation({ description: "Create user" })
  @Post()
  @ApiBody({ type: UpdateUserDto })
  async create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }
  @ApiOperation({ description: "Create user" })
  @Get()
  @UseGuards(AuthGuard)
  @ApiOperation({ description: "get all users" })
  @ApiResponse({ status: 200, description: "get all  user" })
  @ApiParam({ name: "id", description: "param id" })
  findAll() {
    return this.userService.findAll();
  }
  @ApiOperation({ description: "get one user" })
  @Get(":id")
  @ApiResponse({ status: 404, description: "user not found" })
  findOne(@Param("id") id: string) {
    return this.userService.findOne(+id);
  }
  @ApiResponse({ status: 404, description: "user not found" })
  @ApiResponse({ status: 200, description: "Update user" })
  @ApiOperation({ description: "update user" })
  @Patch(":id")
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ status: 200, description: " update user" })
  update(@Param("id") id: string, @Body() UpdateUserDto: UpdateUserDto) {
    return this.userService.update(+id, UpdateUserDto);
  }
  @ApiOperation({ description: "delete user" })
  @ApiResponse({ status: 404, description: " user not found" })
  @ApiResponse({ status: 200, description: "Delete user" })
  @ApiParam({ name: "id", description: "param id" })
  @Delete()
  remove(@Param("id") id: string) {
    return this.userService.remove(+id);
  }
}
