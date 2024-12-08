import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTasksDto } from './dto/filter-tasks.dto';
import { User } from 'src/auth/user.entity';
import { NotFoundError } from 'rxjs';

@Injectable()
export class TasksRepository extends Repository<Task> {
  constructor(private readonly dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }
  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description, status } = createTaskDto;

    const task = this.create({
      title,
      description,
      status,
      user
    });

    await this.save(task)
    return task;
  }

  async findTasks(filterDto: FilterTasksDto, user: User): Promise<Task[]> {
    const { search, isCompleted } = filterDto;

    const query = this.createQueryBuilder('task');
    query.where({ user });

    if (search) {
      query.andWhere(
        '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }

    if (isCompleted !== undefined) {
      query.andWhere('task.isCompleted = :isCompleted', { isCompleted });
    }

    return await query.getMany();
  }

  async findTaskById(id: string, user: User): Promise<Task> {
    const found = await this.findOne({ where: { id, user } });
    
    if (!found) {
      throw new NotFoundException(`Task with ID ${id} could not be deleted`)
    }
    
    return found;
  }

  async updateTask(task: Task, user: User): Promise<Task> {
    return await this.save(task); //TODO: Voir pour inclure le user
  }

  async deleteTaskById(id: string, user: User): Promise<boolean> {
    const result = await this.delete({ id, user });
    return result.affected > 0;
  }
}
