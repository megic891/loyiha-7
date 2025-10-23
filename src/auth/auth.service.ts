import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Auth } from './auth.model';
import { RegisterDto } from './dto/register.dto';
import * as nodemailer from "nodemailer"
import { LoginDto } from './dto/login.dton';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
    private transport = nodemailer.createTransport({
        service: "gmail",
        auth:{
            user: "xmmegic@gmail.com",
            pass: "dbsx brhv zvrq kzdp"
        }
    })
    constructor (
     @InjectModel(Auth) private authModel: typeof Auth,
     private jwtService: JwtService
     ) {}

    async register (RegisterDto: RegisterDto){

   
        const {usernmae, email,password} = RegisterDto
        const user= await this.authModel.findOne({where: {email}})

        if (user) throw new UnauthorizedException("user already exist")
            await this.transport.sendMail({
        from: "xmmegic@gmail.com",
        to: email,
        subject: "hazil",
        text: "salom hazil"
        })
        await this.authModel.create({usernmae, email, password})

        return {message: "Register"} 
    }

    async login (loginDto: LoginDto){

   
        const {email,password} = loginDto
        const user= await this.authModel.findOne({where: {email}})

        if (!user) throw new UnauthorizedException("login not found")
        const payload = { sub: user.id, username: user.username}
        const token = await this.jwtService.signAsync(payload)

        return {message: "succesful",token} 
    }


}

