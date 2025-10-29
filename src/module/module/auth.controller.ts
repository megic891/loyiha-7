import { Body, Controller, Get, HttpCode, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dton";
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
@Controller("Auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @ApiOperation({ description: "Api for register" })
  @ApiResponse({ status: 401, description: "user alredy exits" })
  @ApiResponse({ status: 201, description: "registred" })
  @ApiBody({ type: RegisterDto })
  @Post("register")
  register(@Body() RegisterDto: RegisterDto) {
    return this.authService.register(RegisterDto);
  }
  @HttpCode(200)
  @ApiOperation({ description: "API forlogin" })
  @ApiUnauthorizedResponse({ description: "user not found" })
  @ApiResponse({ status: 200, description: "Succes" })
  @ApiBody({
    type: LoginDto,
  })
  @Post("login")
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
