import { TaskDeletedEvent } from './task-deleted.event';

import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { TaskUpdatedEventHandler } from './task-updated-event.handler';

@EventsHandler(TaskDeletedEvent)
export class TaskDeletedEventHandler implements IEventHandler<TaskDeletedEvent> {
  private logger = new Logger(TaskUpdatedEventHandler.name);

  async handle({ id }: TaskDeletedEvent) {
    this.logger.log(`Task with id ${id} deleted!`);
  }
}
