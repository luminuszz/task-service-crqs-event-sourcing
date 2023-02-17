import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllTasksQuery } from './get-all-tasks.query';
import { Task } from '../task.entity';
import { TaskRepository } from '../contracts/task.repository';

@QueryHandler(GetAllTasksQuery)
export class GetAllTasksQueryHandler implements IQueryHandler<GetAllTasksQuery> {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute({ filter }: GetAllTasksQuery): Promise<Task[]> {
    const response = await this.taskRepository.findAll();

    console.log({ response });

    return response;
  }
}
