import { IsEnum, IsOptional, IsString } from "class-validator";

export class GetTasksFilterDto {
    @IsOptional()
    status?: string;

    @IsOptional()
    @IsString()
    search?: string;
}