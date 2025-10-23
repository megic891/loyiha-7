import { IsOptional, IsString, IsEmail, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  readonly name?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Email formati noto‘g‘ri' })
  readonly email?: string;

  @IsOptional()
  @IsString()
  @MinLength(6, { message: 'Parol kamida 6 ta belgidan iborat bo‘lishi kerak' })
  readonly password?: string;
}