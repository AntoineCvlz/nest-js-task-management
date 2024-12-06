import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.createTask(createTaskDto);
  }
}
