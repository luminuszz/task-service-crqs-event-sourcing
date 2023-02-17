import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { MarkTaskAsCompletedCommand } from '../commands/mark-task-as-completed.command';
import { TaskRepository } from '../contracts/task.repository';

@CommandHandler(MarkTaskAsCompletedCommand)
export class MarkTaskAsCompleteHandler implements ICommandHandler<MarkTaskAsCompletedCommand> {
  constructor(private readonly taskRepository: TaskRepository, private readonly publisher: EventPublisher) {}

  async execute({ task_id }: MarkTaskAsCompletedCommand): Promise<void> {
    const task = this.publisher.mergeObjectContext(await this.taskRepository.find(task_id));

    task.markAsCompleted();

    await this.taskRepository.update(task_id, task);

    task.commit();
  }
}
