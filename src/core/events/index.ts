import { TaskCompletedEventHandler } from './task.completed-event.handler';

export class Events {
  static register() {
    return [TaskCompletedEventHandler];
  }
}
