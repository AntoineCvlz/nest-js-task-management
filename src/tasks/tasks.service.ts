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

  async findTasks(filterDto: FilterTasksDto, user: User): Promise<Task[]> {
    return this.tasksRepository.findTasks(filterDto, user);
  }

  async findTaskById(id: string, user: User): Promise<Task> {
    const task = await this.tasksRepository.findTaskById(id, user);

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return task;
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto, user: User): Promise<Task> {
    const task = await this.findTaskById(id, user);
    Object.assign(task, updateTaskDto);
    return this.tasksRepository.updateTask(task, user);
  }

  async updateTaskStatus(id: string, status: string, user: User): Promise<Task> {
    const task = await this.findTaskById(id, user);
    task.status = status;
    await this.tasksRepository.save(task);

    return task;
  }

  async deleteTask(id: string, user: User): Promise<void> {
    const task = await this.findTaskById(id, user);
    const isDeleted = await this.tasksRepository.deleteTaskById(id, user);

    if (!isDeleted) {
        throw new NotFoundException(`Task with ID ${id} could not be deleted`);
    }
  }

}
