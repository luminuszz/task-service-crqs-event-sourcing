import { CreateTaskCommand } from './create-task.command';
import { MarkTaskAsCompletedCommand } from './mark-task-as-completed.command';
import { UpdateTaskCommand } from './update-task.command';

export class Commands {
  static register() {
    return [CreateTaskCommand, MarkTaskAsCompletedCommand, UpdateTaskCommand];
  }
}
