import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import { Request } from 'express';
import { Observable } from 'rxjs';
import coffeesConfig from 'src/coffees/config/coffees.config';

console.log('coffeesConfig :>> ', coffeesConfig.KEY);
import appConfig from 'src/config/app.config';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    private readonly configService?: ConfigService,
    @Inject(coffeesConfig.KEY)
    private readonly coffeesConfiguration?: ConfigType<typeof coffeesConfig>,
  ) {
    console.log('coffeesConfiguration :>> ', coffeesConfiguration);
  }
  // 该方法应该返回一个 boolean 指示当期那请求是否被允许继续还是拒绝访问
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.header('Authorization');
    console.log('this.configService :>> ', this.configService); // 值为undefined。。。
    return authHeader === this.configService.get('apiKey');
  }
}
