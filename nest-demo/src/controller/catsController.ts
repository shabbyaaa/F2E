import { Body, Controller, Get, Post } from '@nestjs/common';

import { CreateCatDto } from '../dto/cats';
import CatsService from '../service/cats';
import { Cat } from '../interfaces/cat';

@Controller('cats')
export default class Cats {
  constructor(private catsService: CatsService) {}

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }
}
