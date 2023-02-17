import { CreateTaskCommand } from './create-task.command';
import { MarkTaskAsCompletedCommand } from './mark-task-as-completed.command';

export class Commands {
  static register() {
    return [CreateTaskCommand, MarkTaskAsCompletedCommand];
  }
}
