import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class UpdateTaskStatusDto {
    @ApiProperty({ description: 'Status of the task' })
    @IsString()
    status: string;
}