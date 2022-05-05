import { DynamicModule, Module } from '@nestjs/common';
import { ConnectionOptions, createConnection } from 'typeorm';

// 动态模块
// 根据再别的地方import DatabaseModule.register({}) 传入的参数
@Module({
  // providers: [
  //   {
  //     provide: 'CONNECTION',
  //     useValue: createConnection({
  //       type: 'postgres',
  //       host: 'localhost',
  //       port: 5432,
  //     }),
  //   },
  // ],
})
export class DatabaseModule {
  static register(options: ConnectionOptions): DynamicModule {
    return {
      module: DatabaseModule,
      providers: [
        {
          provide: 'CONNECTION',
          useValue: createConnection(options),
        },
      ],
    };
  }
}
