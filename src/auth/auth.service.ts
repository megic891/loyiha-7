import { Injectable, UnauthorizedException } from "@nestjs/common";
import { RegisterDto } from "./dto/register.dto";
import * as nodemailer from "nodemailer";
import { LoginDto } from "./dto/login.dton";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  private transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "xmmegic@gmail.com",
      pass: "dbsx brhv zvrq kzdp",
    },
  });
  authModel: any;
  authRepo: any;
  constructor(private jwtService: JwtService) {}

  async register(RegisterDto: RegisterDto): Promise<{ message: string }> {
    const { usernmae, email, password } = RegisterDto;
    const user = await this.authRepo.findOneBy({ email });

    if (user) throw new UnauthorizedException("user already exist");
    await this.transport.sendMail({
      from: "xmmegic@gmail.com",
      to: email,
      subject: "hazil",
      text: "salom hazil",
    });

    const hash = await bcrypt.hash(password, 10);
    await this.authRepo;

    return { message: "Register" };
  }

  async login(
    loginDto: LoginDto
  ): Promise<{ message: string } | { message: string; token: string }> {
    const { email, password } = loginDto;
    const user = await this.authRepo.findOneBy({ email });

    if (!user) throw new UnauthorizedException("login not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const payload = {
        sub: user.id,
        username: user.username,
        role: user.dataValues.role,
      };
      const token = await this.jwtService.signAsync(payload);

      return { message: "succesful", token };
    } else {
      return { message: "wrong password" };
    }
  }
}
