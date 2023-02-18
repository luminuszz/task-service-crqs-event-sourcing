import { Task } from '../task.entity';

export abstract class TaskRepository {
  abstract save(task: Task): Promise<void>;

  abstract find(id: string): Promise<Task>;

  abstract update(task_id: string, task: Partial<Task>): Promise<void>;

  abstract findAll(filter?: string): Promise<Task[]>;

  abstract delete(id: string): Promise<void>;

  abstract saveMany(tasks: Task[]): Promise<void>;
}
