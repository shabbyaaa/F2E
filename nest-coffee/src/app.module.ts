import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from '@hapi/joi';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { CoffeeRatingModule } from './coffee-rating/coffee-rating.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';

// ConfigModule会在应用程序的根目录中查找 .env 文件
// Joi 验证env中的变量有没有传递
@Module({
  imports: [
    ConfigModule.forRoot({
      // envFilePath: '.env', // 指定路径
      // ignoreEnvFile: true, // 忽略.env文件
      validationSchema: Joi.object({
        DATABASE_HOST: Joi.required(),
        DATABASE_PORT: Joi.number().default(5432),
      }),
      load: [appConfig], // 自动遍历我们在自定义配置文件中创建的嵌套自定义配置对象
      // 在具体的ConfigService中使用时还是从对象中取得 例如 database.host
    }),
    CoffeesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true, // 有助于自动加载模块，而不是指定实体数组
      synchronize: true, // 确保TypeORM实体在每次运行应用程序时都会与数据库同步 生产禁用
    }),
    CoffeeRatingModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
