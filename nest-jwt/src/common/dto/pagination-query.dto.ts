import { IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  // 如果值为正数，则大于零
  @IsPositive()
  readonly pageNo: number;

  @IsOptional()
  @IsPositive()
  readonly pageSize: number;
}
