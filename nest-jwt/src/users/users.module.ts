import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrateagy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';

// const jwtModule = JwtModule.registerAsync({
//   imports: [ConfigModule],
//   inject: [ConfigService],
//   useFactory: async (configService: ConfigService) => {
//     return {
//       secret: configService.get('JWT_SECRET'),
//       signOptions: { expiresIn: '4h' },
//     };
//   },
// });

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_SECRET'),
          // secret: 'ThisIsASecretKey',
          signOptions: { expiresIn: '4h' },
        };
      },
    }),
    // JwtModule.register({
    //   // secret: `${process.env.JWT_SECRET}`,
    //   secret: 'test',
    //   signOptions: { expiresIn: '8h' },
    // }),
  ],
  controllers: [UsersController],
  providers: [UsersService, JwtStrateagy, LocalStrategy, ConfigService],
})
export class UsersModule {}
