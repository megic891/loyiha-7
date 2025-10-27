import { IsEmail, IsNotEmpty, IsString, Length} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class RegisterDto {
    @IsString()
        @Length(3, 100)
        @IsNotEmpty()

    @ApiProperty({description: "username for registred",example: "ali"})
    usernmae: string;
    @IsEmail()
     @Length(3, 300)
        @IsNotEmpty()
        @ApiProperty({description: "email for registred",example: "ali@gmail.com"})
    email: string;
    @IsString()
        @ApiProperty({description: "pasword for registred",example: "ali8928289s"})

    password: string;
}


