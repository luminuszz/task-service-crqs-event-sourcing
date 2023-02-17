import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateTaskCommand } from '../commands/create-task.command';
import { TaskRepository } from '../contracts/task.repository';
import { Task } from '../task.entity';

@CommandHandler(CreateTaskCommand)
export class CreateTaskHandler implements ICommandHandler<CreateTaskCommand> {
  constructor(private readonly taskRepository: TaskRepository, private readonly eventPublisher: EventPublisher) {}

  async execute({ title, description }: CreateTaskCommand) {
    const task = this.eventPublisher.mergeObjectContext(
      Task.create({
        title,
        description,
        created_at: new Date(),
        completed_at: null,
        updated_at: new Date(),
      }),
    );

    await this.taskRepository.save(task);

    task.commit();
  }
}
