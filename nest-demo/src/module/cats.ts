import { Global, Module } from '@nestjs/common';

import CatsController from '../controller/catsController';
import CatsService from '../service/cats';

// 全局模块 不需要在imports数组中导入
@Global()
@Module({
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService], // 可被任意模块重复使用
})
export default class CatsModule {
  constructor(private readonly catsService: CatsService) {}
}
