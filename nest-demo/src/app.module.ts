import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import CatsController from './controller/catsController';
import CatsService from './service/cats';

/**
 * provider: 由Nest注入器实例化的提供者，并且可以至少在整个模块中共享
 * controller: 必须创建的一组控制器
 * imports: 导入模块的列表，这些模块导出了此模块中所需提供者
 * exports: 由于模块提供并应在其他模块中可用的提供者的子集
 */
@Module({
  imports: [],
  controllers: [AppController, CatsController],
  providers: [AppService, CatsService],
})
export class AppModule {}
