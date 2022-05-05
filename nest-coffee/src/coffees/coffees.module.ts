import { Injectable, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { COFFEE_BRANDS } from './coffees.constants';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { Event } from '../events/entities/event.entity';
import { Connection } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import coffeesConfig from './config/coffees.config';

class ConfigService {}
class DevelopmentConfigService {}
class ProductionConfigService {}

@Injectable()
export class CoffeeBrandsFactory {
  create() {
    return ['buddy brew', 'nescafe'];
  }
}

@Module({
  imports: [
    TypeOrmModule.forFeature([Coffee, Flavor, Event]),
    ConfigModule.forFeature(coffeesConfig), // 注册coffees自己的特定属性 而不是都放在全局
  ],
  controllers: [CoffeesController],
  providers: [
    {
      provide: CoffeesService,
      useClass: CoffeesService,
    },
    // {
    //   provide: COFFEE_BRANDS,
    //   useValue: ['buddy brew', 'nescafe'],
    // },
    {
      provide: COFFEE_BRANDS,
      // 动态的 如果需要将provide的值基于各种其他依赖项、值等
      // useFactory: (brandsFactory: CoffeeBrandsFactory) =>
      //   brandsFactory.create(),
      // inject: [CoffeeBrandsFactory],

      // 异步的 模拟从数据库中查询
      useFactory: async (connection: Connection): Promise<string[]> => {
        const coffeeBrands = await Promise.resolve(['buddy brew', 'nescafe']);

        return coffeeBrands;
      },
      inject: [Connection],
    },
    {
      provide: ConfigService,
      useClass:
        process.env.NODE_ENV === 'development'
          ? DevelopmentConfigService
          : ProductionConfigService,
    },
  ],
  exports: [CoffeesService],
})
export class CoffeesModule {}
