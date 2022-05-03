import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';

@Module({
  imports: [
    CoffeesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'pass123',
      database: 'postgres',
      autoLoadEntities: true, // 有助于自动加载模块，而不是指定实体数组
      synchronize: true, // 确保TypeORM实体在每次运行应用程序时都会与数据库同步 生产禁用
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
