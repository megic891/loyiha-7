import { IsEmail, isString, IsString} from "class-validator";

export class RegisterDto {
    @IsString()
    usernmae: string;
    @IsEmail()
    email: string;
    @IsString()
    password: string;
}
