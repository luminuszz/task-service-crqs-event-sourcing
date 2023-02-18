import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UpdateTaskCommand } from '../commands/update-task.command';
import { TaskRepository } from '../contracts/task.repository';

@CommandHandler(UpdateTaskCommand)
export class UpdateTaskHandler implements ICommandHandler<UpdateTaskCommand> {
  constructor(private readonly taskRepository: TaskRepository, private readonly publisher: EventPublisher) {}

  async execute({ payload, id }: UpdateTaskCommand): Promise<void> {
    const response = await this.taskRepository.find(id);

    if (!response?.id) {
      throw new Error('Task not found!');
    }

    const task = this.publisher.mergeObjectContext(response);

    task.updateTask({
      title: payload?.title,
      description: payload?.description,
    });

    await this.taskRepository.update(id, task);

    task.commit();
  }
}
