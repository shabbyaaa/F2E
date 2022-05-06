import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

// 单个controller上 仅在该controller定义每个路由处理程序
// @UsePipes(ValidationPipe)
@Controller('coffees')
export class CoffeesController {
  constructor(
    private readonly coffeesService: CoffeesService,
    // 在REQUEST时 需要访问请求特定信息如 headers、cookies、IP ...
    @Inject(REQUEST) private readonly request: Request,
  ) {
    // CoffeesService那边使用REQUEST 这里也自动变为REQUEST 即请求几次实例化几次
    // console.log('CoffeesController created');
  }

  // 绑定到单个路由
  // @UsePipes(ValidationPipe)
  @Get()
  // 使用底层库 express 就不能用HttpCode或者拦截器了
  // findAll(@Res() response) {
  //   return response.status(200).send('This actions retures all coffees');
  // }
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.coffeesService.findAll(paginationQuery);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.coffeesService.findOne('' + id);
  }

  @Post()
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    console.log(createCoffeeDto instanceof CreateCoffeeDto);
    return this.coffeesService.create(createCoffeeDto);
  }

  // validationPipe放到参数上 只有管道上特有
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateCoffeeDto: UpdateCoffeeDto,
  ) {
    return this.coffeesService.update(id, updateCoffeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coffeesService.remove(id);
  }
}
