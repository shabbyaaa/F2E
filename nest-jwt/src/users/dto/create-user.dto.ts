import {
  IsString,
  IsEmail,
  IsNumber,
  IsDate,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'The account of a user' })
  @IsString()
  readonly account!: string;

  @ApiProperty({ description: 'The password of a user' })
  @IsString()
  readonly password!: string;

  @ApiProperty({ description: 'The email of a user' })
  @IsOptional()
  @IsEmail()
  readonly email: string;

  @ApiProperty({ description: 'The role of a user' })
  @IsNumber()
  readonly role: number;

  @ApiProperty({ description: 'The user_status of a user' })
  @IsNumber()
  readonly user_status: number;

  @ApiProperty({ description: 'The create_time of a user' })
  @IsDate()
  @IsOptional()
  readonly create_time: Date;

  @ApiProperty({ description: 'The update_time of a user' })
  @IsDate()
  @IsOptional()
  readonly update_time: Date;
}
