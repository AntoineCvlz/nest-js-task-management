import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTasksDto } from './dto/filter-tasks.dto';

@Injectable()
export class TasksRepository extends Repository<Task> {
  constructor(private readonly dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.create(createTaskDto);
    return await this.save(task);
  }

  async findTasks(filterDto: FilterTasksDto): Promise<Task[]> {
    const { search, isCompleted } = filterDto;

    const query = this.createQueryBuilder('task');

    if (search) {
      query.andWhere(
        '(task.title LIKE :search OR task.description LIKE :search)',
        { search: `%${search}%` },
      );
    }

    if (isCompleted !== undefined) {
      query.andWhere('task.isCompleted = :isCompleted', { isCompleted });
    }

    return await query.getMany();
  }

  async findTaskById(id: string): Promise<Task> {
    const task = await this.findOne({ where: { id } });
    return task;
  }

  async updateTask(task: Task): Promise<Task> {
    return await this.save(task);
  }

  async deleteTaskById(id: string): Promise<boolean> {
    const result = await this.delete(id);
    return result.affected > 0;
  }
}
