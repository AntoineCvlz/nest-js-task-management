import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsBoolean } from 'class-validator';

export class UpdateTaskDto {
  @ApiPropertyOptional({ description: 'Title of the task' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ description: 'Description of the task' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: 'Status of the task' })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiPropertyOptional({ description: 'Task finished or not' })
  @IsOptional()
  @IsBoolean()
  isCompleted?: boolean;
}