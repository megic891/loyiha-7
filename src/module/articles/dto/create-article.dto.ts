
import { Type } from "class-transformer";
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsOptional,
  IsString,
  IsNumber,
  ValidateNested,
} from "class-validator";

export enum ContentType {
  IMAGE = "image",
  CODE = "code",
  LIST = "list",
  PARAGRAPH = "paragraph",
  HEADING = "heading",
}

export class CreateArticleContentDto {
  @IsString()
  content: string;

  @IsNumber()
  order: number;

  @IsEnum(ContentType)
  contentType: ContentType;
}

export class CreateArticleDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  body: string;

  // <-- Service-da imgurl deb o'qilgani uchun shu nomni ishlatdim
  @IsString()
  imgurl: string;

  @IsArray()
  @IsString({ each: true })
  tags: string[]; // massiv bo'lishi kerak

  @IsOptional()
  @IsBoolean()
  isMemberOnly?: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateArticleContentDto)
  content: CreateArticleContentDto[]; // massiv tipida
}