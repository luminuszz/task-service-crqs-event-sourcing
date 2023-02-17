import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { Commands } from './commands';
import { Handlers } from './handlers';
import { CqrsModule } from '@nestjs/cqrs';
import { TaskRepository } from './contracts/task.repository';
import { InMemoryTaskRepository } from '../infra/in-memory-task.repository';
import { Events } from './events';
import { Queries } from './queries';

@Module({
  imports: [CqrsModule],
  providers: [
    {
      provide: TaskRepository,
      useClass: InMemoryTaskRepository,
    },
    TaskService,
    ...Commands.register(),
    ...Handlers.register(),
    ...Events.register(),
    ...Queries.register(),
  ],
  exports: [TaskService],
})
export class CoreModule {}
