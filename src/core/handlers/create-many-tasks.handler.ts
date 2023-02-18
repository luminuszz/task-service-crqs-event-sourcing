import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateManyTasksCommand } from '../commands/create-many-tasks.command';
import { TaskRepository } from '../contracts/task.repository';
import { Task } from '../task.entity';

@CommandHandler(CreateManyTasksCommand)
export class CreateManyTasksHandler implements ICommandHandler<CreateManyTasksCommand> {
  constructor(private readonly taskRepository: TaskRepository, private readonly publisher: EventPublisher) {}

  async execute({ payload }: CreateManyTasksCommand): Promise<void> {
    const tasks = payload.map((newTask) =>
      this.publisher.mergeObjectContext(
        Task.create({
          title: newTask.title,
          description: newTask.description,
          created_at: new Date(),
          updated_at: new Date(),
          completed_at: null,
        }),
      ),
    );

    await this.taskRepository.saveMany(tasks);

    tasks.forEach((task) => task.commit());
  }
}
