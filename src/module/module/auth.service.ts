import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dton";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import * as nodemailer from "nodemailer";
import { Auth } from "src/shared/entities/auth.entity";


@Injectable()
export class AuthService {
  private transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "xmmegic@gmail.com",
      pass: "dbsx brhv zvrq kzdp", 
    },
  });

  constructor(
    private readonly jwtService: JwtService,

    
    @InjectRepository(Auth)
    private readonly authRepo: Repository<Auth>,
  ) {}

  async register(registerDto: RegisterDto): Promise<{ message: string }> {
    const { username, email, password } = registerDto;

    const user = await this.authRepo.findOneBy({ email });
    if (user) throw new UnauthorizedException("User already exists");

    await this.transport.sendMail({
      from: "xmmegic@gmail.com",
      to: email,
      subject: "Ro‘yxatdan o‘tish",
      text: "Salom Siz muvaffaqiyatli ro‘yxatdan o‘tdingiz.",
    });

    const hash = await bcrypt.hash(password, 10);
    const newUser = this.authRepo.create({ username, email, password: hash });
    await this.authRepo.save(newUser);

    return { message: "Registered successfully" };
  }

  async login(
    loginDto: LoginDto
  ): Promise<{ message: string; token?: string }> {
    const { email, password } = loginDto;
    const user = await this.authRepo.findOneBy({ email });

    if (!user) throw new UnauthorizedException("User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException("Wrong password");

    const payload = {
      sub: user.id,
      username: user.username,
      role: user.role,
    };
    const token = await this.jwtService.signAsync(payload);

    return { message: "Login successful", token };
  }
}
