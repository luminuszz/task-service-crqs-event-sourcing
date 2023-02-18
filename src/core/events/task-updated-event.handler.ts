import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { TaskUpdatedEvent } from './task-updated.event';
import { Logger } from '@nestjs/common';

@EventsHandler(TaskUpdatedEvent)
export class TaskUpdatedEventHandler implements IEventHandler<TaskUpdatedEvent> {
  private logger = new Logger(TaskUpdatedEventHandler.name);

  handle({ payload }: TaskUpdatedEvent): void {
    this.logger.log(`Task with id ${payload.id} was updated! -> ${JSON.stringify(payload)}`);
  }
}
