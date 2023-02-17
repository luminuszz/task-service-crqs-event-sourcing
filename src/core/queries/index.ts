import { GetAllTasksQueryHandler } from './get-all-tasks-query.handler';

export class Queries {
  static register() {
    return [GetAllTasksQueryHandler];
  }
}
