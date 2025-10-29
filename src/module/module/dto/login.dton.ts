import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Length} from "class-validator";

export class LoginDto {
    @IsEmail()
    @Length(3, 100)
    @IsNotEmpty()
    email: string;

    @IsString()
    @ApiProperty({description: "username for registred"})
    @Length(3, 300)
    @IsNotEmpty()
    password: string;

}
