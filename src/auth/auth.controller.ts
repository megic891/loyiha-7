import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dton';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  register (@Body() RegisterDto : RegisterDto) {
    return this. authService.register(RegisterDto)
  }
  @HttpCode(200)
 @Post("login")
  login (@Body() loginDto : LoginDto) {
    return this.authService.login(loginDto)
  }
 
}

