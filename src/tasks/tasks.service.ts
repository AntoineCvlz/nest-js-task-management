import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksRepository } from './tasks.repository';
import { Task } from './task.entity';
import { FilterTasksDto } from './dto/filter-tasks.dto';
import { UpdateTaskDto } from './dto/update-task-dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
  constructor(
    private tasksRepository: TasksRepository
  ) {}

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto, user);
  }

  async findTasks(filterDto: FilterTasksDto): Promise<Task[]> {
    return this.tasksRepository.findTasks(filterDto);
  }

  async findTaskById(id: string): Promise<Task> {
    const task = await this.tasksRepository.findTaskById(id);

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return task;
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.findTaskById(id);
    Object.assign(task, updateTaskDto);
    return this.tasksRepository.updateTask(task);
  }

  async updateTaskStatus(id: string, status: string): Promise<Task> {
    const task = await this.findTaskById(id);
    task.status = status;
    await this.tasksRepository.save(task);

    return task;
  }

  async deleteTask(id: string): Promise<void> {
    const task = await this.findTaskById(id);
    const isDeleted = await this.tasksRepository.deleteTaskById(id);

    if (!isDeleted) {
        throw new NotFoundException(`Task with ID ${id} could not be deleted`);
    }
  }

}
