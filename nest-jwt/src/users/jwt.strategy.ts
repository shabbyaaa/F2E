import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
// import { Strategy } from 'passport-local';

// 服务端根据jwt字符串的内总 找到用户信息
@Injectable()
export class JwtStrateagy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: `${process.env.JWT_SECRET}`,
    });

    console.log('process.env.JWT_SECRET :>> ', process.env.JWT_SECRET);
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
