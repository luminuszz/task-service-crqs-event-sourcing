import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { TaskCompletedEvent } from './task-completed.event';
import { TaskRepository } from '../contracts/task.repository';
import { Logger } from '@nestjs/common';

@EventsHandler(TaskCompletedEvent)
export class TaskCompletedEventHandler implements IEventHandler<TaskCompletedEvent> {
  private logger = new Logger(TaskCompletedEventHandler.name);

  constructor(private readonly taskRepository: TaskRepository) {}

  async handle({ task_id }: TaskCompletedEvent) {
    this.logger.log('Event handle for task completed event -> ', task_id);
  }
}
