import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({ description: '用户名', example: 'admin1' })
  @IsNotEmpty({ message: '用户名不能为空' })
  readonly account: string;

  @ApiProperty({ description: '密码', example: '123456' })
  @IsNotEmpty({ message: '密码不能为空' })
  readonly password: string;
}
