import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateTaskCommand } from './commands/create-task.command';
import { MarkTaskAsCompletedCommand } from './commands/mark-task-as-completed.command';
import { GetAllTasksQuery } from './queries/get-all-tasks.query';
import { UpdateTaskCommand } from './commands/update-task.command';
import { DeleteTaskCommand } from './commands/delete-task.command';
import { CreateManyTasksCommand } from './commands/create-many-tasks.command';

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

  async updateTask(id: string, payload: Partial<CreateTaskInput>) {
    return this.commandBus.execute(new UpdateTaskCommand(id, payload));
  }

  async deleteTask(id: string) {
    return this.commandBus.execute(new DeleteTaskCommand(id));
  }

  async createManyTasks(payload: CreateTaskInput[]) {
    return this.commandBus.execute(new CreateManyTasksCommand(payload));
  }
}
