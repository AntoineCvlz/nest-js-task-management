import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";


export class CreateTaskDto {
    @ApiProperty({ description: 'Title of the task' })
    @IsNotEmpty()
    title: string;

    @ApiProperty({ description: 'Description of the task' })
    @IsNotEmpty()
    description: string;

    @ApiProperty({ description: 'Status of the task' })
    @IsNotEmpty()
    status: string;
}