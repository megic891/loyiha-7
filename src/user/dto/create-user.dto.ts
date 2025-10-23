
import { IsEmail, IsNumber, IsString} from "class-validator";

export class CreateUserDto {
    @IsString()
    usernmae: string;
    @IsEmail()
    email: string;
    @IsString()
    password: string;

      @IsNumber()
    age: string;
    @IsString()
    img: string;
}
