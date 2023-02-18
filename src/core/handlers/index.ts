import { CreateTaskHandler } from './create-task.handler';
import { MarkTaskAsCompleteHandler } from './mark-task-as-complete.handler';
import { UpdateTaskHandler } from './update-task.handler';
import { DeleteTaskHandler } from './delete-task.handler';

export class Handlers {
  static register() {
    return [CreateTaskHandler, MarkTaskAsCompleteHandler, UpdateTaskHandler, DeleteTaskHandler];
  }
}
