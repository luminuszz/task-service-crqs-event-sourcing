import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { DeleteTaskCommand } from '../commands/delete-task.command';
import { TaskRepository } from '../contracts/task.repository';

@CommandHandler(DeleteTaskCommand)
export class DeleteTaskHandler implements ICommandHandler<DeleteTaskCommand> {
  constructor(private readonly taskRepository: TaskRepository, private readonly publisher: EventPublisher) {}

  async execute({ id }: DeleteTaskCommand): Promise<void> {
    const response = await this.taskRepository.find(id);

    if (!response) {
      throw new Error('Task not found!');
    }

    const task = this.publisher.mergeObjectContext(response);

    task.delete();

    await this.taskRepository.delete(id);

    task.commit();
  }
}
