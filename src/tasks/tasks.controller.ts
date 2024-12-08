import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task-dto';
import { FilterTasksDto } from './dto/filter-tasks.dto';
import { Task } from './task.entity';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Post()
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ) {
    return this.tasksService.createTask(createTaskDto, user);
  }

  @Get()
  findTasks(
    @Query() filterDto: FilterTasksDto,
    @GetUser() user: User,
): Promise<Task[]> {
    return this.tasksService.findTasks(filterDto, user);
  }

  @Get(':id')
  findTaskById(@Param('id') id: string, @GetUser() user: User): Promise<Task> {
    return this.tasksService.findTaskById(id, user);
  }

  @Patch(':id')
  updateTask(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.updateTask(id, updateTaskDto, user);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
    @GetUser() user: User,
  ): Promise<Task> {
    const { status } = updateTaskStatusDto;
    return this.tasksService.updateTaskStatus(id, status, user);
  }

  @Delete(':id')
  deleteTask(
    @Param('id') id: string,
    @GetUser() user: User,
  ) {
    return this.tasksService.deleteTask(id, user);
  }
}
