import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrateagy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({
      secret: `${process.env.JWT_SECRET}`,
      signOptions: { expiresIn: '8h' },
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, JwtStrateagy, LocalStrategy],
})
export class UsersModule {
  constructor() {
    console.log('process.env.111 :>> ', process.env.JWT_SECRET);
  }
}
