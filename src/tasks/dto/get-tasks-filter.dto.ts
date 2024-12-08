import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsString } from "class-validator";

export class GetTasksFilterDto {
    @ApiPropertyOptional({ description: 'Status of the task' })
    @IsOptional()
    status?: string;

    @ApiPropertyOptional({ description: 'Search task by title or description' })
    @IsOptional()
    @IsString()
    search?: string;
}