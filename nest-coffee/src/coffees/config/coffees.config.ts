import { registerAs } from '@nestjs/config';

// registerAs 在coffees下注册一个命名空间 配置对象
export default registerAs('coffees', () => ({
  foo: 'bar',
}));
