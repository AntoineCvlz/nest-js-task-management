import { IsOptional, IsString, IsBoolean } from 'class-validator';

export class FilterTasksDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsBoolean()
  isCompleted?: boolean;
}