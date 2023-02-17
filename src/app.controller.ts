import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { TaskService } from './core/task.service';

@Controller('tasks')
export class AppController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async createTask(@Body() payload: any) {
    console.log({ payload });

    return this.taskService.createTask(payload);
  }

  @Patch(':id')
  async markTaskAsCompleted(@Param('id') task_id: string) {
    return this.taskService.markTaskAsCompleted(task_id);
  }

  @Get()
  async getAllTasks() {
    return this.taskService.getAllTasks();
  }
}
