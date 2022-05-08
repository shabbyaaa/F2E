import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCoffeeDto {
  // 此装饰器允许设置各种模式对象属性 如default description等
  @ApiProperty({ description: 'The name of a coffee' })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'The brand of a coffee' })
  @IsString()
  readonly brand: string;

  @IsString({ each: true })
  readonly flavors: string[];
}
