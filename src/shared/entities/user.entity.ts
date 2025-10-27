import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn,  } from "typeorm";

@Entity()
export class User  {

    @PrimaryGeneratedColumn()
    @ApiProperty({default: "ali"})
    usernname: string

      @Column()
      @ApiProperty({default: "ali@gmail.com"})
    email: string

      @Column()
      @ApiProperty({default: "ali1111"})
    password: string

       @Column()
       @ApiProperty({default: "14"})
    age: number
     @ApiProperty({default: "http://kun.uz"})
      @Column()
    img: string



}






