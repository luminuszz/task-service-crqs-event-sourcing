import { CreateTaskHandler } from './create-task.handler';
import { MarkTaskAsCompleteHandler } from './mark-task-as-complete.handler';

export class Handlers {
  static register() {
    return [CreateTaskHandler, MarkTaskAsCompleteHandler];
  }
}
