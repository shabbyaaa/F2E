import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Protocol = createParamDecorator(
  // 从第一个参数data里面 可以拿到装饰器中的参数 eg: @Protocol('https')
  (defaultValue: string, ctx: ExecutionContext) => {
    console.log('defaultValue :>> ', defaultValue);
    const request = ctx.switchToHttp().getRequest();

    return request.protocol;
  },
);
