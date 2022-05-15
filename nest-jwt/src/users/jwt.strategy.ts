import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
// import { Strategy } from 'passport-local';

// 服务端根据jwt字符串的内总 找到用户信息
@Injectable()
export class JwtStrateagy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      // fromHeader： 在Http 请求头中查找JWT
      // fromBodyField: 在请求的Body字段中查找JWT
      // fromAuthHeaderAsBearerToken：在授权标头带有Bearer方案中查找JWT
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET'),
      // secretOrKey: `${process.env.JWT_SECRET}`,
      // secretOrKey: 'test',
    } as StrategyOptions);
  }

  async validate(payload: any) {
    console.log('payload :>> ', payload);
    return {
      userId: payload.sub,
      account: payload.account,
      role: payload.role,
    };
  }
}
