import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { TaskCreatedEvent } from './task-created.event';
import { Logger } from '@nestjs/common';

@EventsHandler(TaskCreatedEvent)
export class TaskCreatedEventHandler implements IEventHandler<TaskCreatedEvent> {
  private logger = new Logger(TaskCreatedEventHandler.name);

  handle({ task }: TaskCreatedEvent) {
    this.logger.log(`Task with id ${task.id} created! -> ${JSON.stringify(task)}`);
  }
}
