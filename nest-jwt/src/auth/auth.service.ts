import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(account: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(account);

    if (user && user.password === password) {
      return user;
    }

    return null;
  }

  // 注册
  //   async register(user: any) {
  //     let user;
  //   }

  async login(loginUserDto: LoginUserDto) {
    const token = this.usersService.login(loginUserDto);

    return {
      access_token: token,
      statusCode: 200,
    };
  }
}
