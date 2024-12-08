import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsBoolean } from 'class-validator';

export class FilterTasksDto {
  @ApiPropertyOptional({ description: 'Search' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ description: 'Is completed' })
  @IsOptional()
  @IsBoolean()
  isCompleted?: boolean;
}