import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tags } from 'src/shared/entities/tags.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TagsService {
  tagsTepository: any;
  constructor (@InjectRepository(Tags) private tegsRepository: Repository<Tags>){}

  async create(createTagDto: CreateTagDto) {
    const {name, description} = createTagDto
    const tag = this.tagsTepository.create({name, description})
    return this.tagsTepository.save(tag)
  }

  findAll() {
    return this.tagsTepository.find()
  }





  async remove(id: number) {
    const tag = await this.tagsTepository.findOneBy({id: +id})
    if(!tag) throw new NotFoundException ("tag not found")

      await this.tagsTepository.remove(tag)
      return { message: "Delete tag"}
  }
}
