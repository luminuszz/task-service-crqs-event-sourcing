import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateTaskCommand } from './commands/create-task.command';
import { MarkTaskAsCompletedCommand } from './commands/mark-task-as-completed.command';
import { GetAllTasksQuery } from './queries/get-all-tasks.query';

interface CreateTaskInput {
  title: string;
  description: string;
}

@Injectable()
export class TaskService {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  async createTask(payload: CreateTaskInput) {
    return this.commandBus.execute(new CreateTaskCommand(payload.title, payload.description));
  }

  async markTaskAsCompleted(id: string) {
    return this.commandBus.execute(new MarkTaskAsCompletedCommand(id));
  }

  async getAllTasks(filter?: string) {
    return this.queryBus.execute(new GetAllTasksQuery(filter));
  }
}
