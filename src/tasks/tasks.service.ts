import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksRepository } from './tasks.repository';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    // @InjectRepository(Task) //SI ON ENLEVE TasksRepository du provider
    private tasksRepository: TasksRepository
  ) {}

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto);
  }

}
