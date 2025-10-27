
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsString, Length} from "class-validator";

export class CreateUserDto {

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

    @IsNumber()
          @IsNotEmpty()
          @ApiProperty({description: "age for registred",example: "ali@gmail.com"})
    age: string;
    @IsString()
           @Length(3, 300)
          @IsNotEmpty()
          @ApiProperty({description: "image for registred",example: "http://kun.uz"})
    img: string;

  }
  
  

    
