import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksRepository extends Repository<Task> {
  constructor(private readonly dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.create(createTaskDto);
    return await this.save(task);
  }
}
