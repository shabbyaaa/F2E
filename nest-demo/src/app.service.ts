import { Injectable } from '@nestjs/common';

// controller应处理HTTP请求并将更复杂的任务委托给providers
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
