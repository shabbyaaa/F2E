import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRespository: Repository<Coffee>,
  ) {}

  findAll() {
    return this.coffeeRespository.find();
  }

  async findOne(id: string) {
    const coffee = await this.coffeeRespository.findOne(id);

    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }

    return coffee;
  }

  create(createCoffeeDto: CreateCoffeeDto) {
    const coffee = this.coffeeRespository.create(createCoffeeDto);

    return this.coffeeRespository.save(coffee);
  }

  async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    const coffee = await this.coffeeRespository.preload({
      id: +id,
      ...updateCoffeeDto,
    });

    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return this.coffeeRespository.save(coffee);
  }

  async remove(id: string) {
    const coffee = await this.findOne(id);

    return this.coffeeRespository.remove(coffee);
  }
}
