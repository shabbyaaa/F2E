import { Type } from 'class-transformer';
import { IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  // 如果值为正数，则大于零
  @IsPositive()
  limit: number;

  @IsOptional()
  @IsPositive()
  offset: number;
}
