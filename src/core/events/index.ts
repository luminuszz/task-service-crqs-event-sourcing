import { TaskCompletedEventHandler } from './task.completed-event.handler';
import { TaskUpdatedEventHandler } from './task-updated-event.handler';
import { TaskDeletedEventHandler } from './task-deleted-event.handler';
import { TaskCreatedEventHandler } from './task-created-event.handler';

export class Events {
  static register() {
    return [TaskCompletedEventHandler, TaskUpdatedEventHandler, TaskDeletedEventHandler, TaskCreatedEventHandler];
  }
}
