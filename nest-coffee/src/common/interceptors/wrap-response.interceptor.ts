import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
// 是一个使用Observatbles进行反应式编程的库，使编写异步回调基本代码更容易 使promise的强大替代品
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

// 拦截器
@Injectable()
export class WrapResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Beform...');

    // tap：在observable流正常终止时调用匿名日志记录函数
    // return next.handle().pipe(tap((data) => console.log('After...', data)));
    // map 从流中获取一个值并返回一个修改后的值
    return next.handle().pipe(map((data) => ({ data })));
  }
}
