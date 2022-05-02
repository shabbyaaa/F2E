import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {
  @Get()
  // 使用底层库 express 就不能用HttpCode或者拦截器了
  // findAll(@Res() response) {
  //   return response.status(200).send('This actions retures all coffees');
  // }
  findAll() {
    return 'This actions retures all coffees';
  }

  @Get(':id')
  findOne(@Param('id') id) {
    return `This actions returns #${id} coffee`;
  }

  @Post()
  @HttpCode(HttpStatus.GONE)
  create(@Body() body) {
    return body;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body) {
    return `This actions updates #${id} coffee`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This actions removes #${id} coffee`;
  }
}
