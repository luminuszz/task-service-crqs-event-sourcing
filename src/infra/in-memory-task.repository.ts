import { TaskRepository } from '../core/contracts/task.repository';
import { Task } from '../core/task.entity';

export class InMemoryTaskRepository implements TaskRepository {
  public tasks: Task[] = [];

  constructor() {
    this.tasks = [];
  }

  async save(task: Task): Promise<void> {
    this.tasks.push(task);
  }

  async find(id: string): Promise<Task> {
    return this.tasks.find((item) => item.id === id);
  }

  async update(id: string, payload: Partial<Task>): Promise<void> {
    const taskIndex = this.tasks.findIndex((item) => item.id === id);

    if (taskIndex === -1) throw new Error('Task not found!');

    this.tasks[taskIndex] = { ...this.tasks[taskIndex], ...payload } as any;
  }

  async findAll(): Promise<Task[]> {
    return this.tasks;
  }
}
