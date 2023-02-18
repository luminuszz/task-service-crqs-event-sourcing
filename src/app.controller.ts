import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { TaskService } from './core/task.service';

@Controller('tasks')
export class AppController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async createTask(@Body() payload: any) {
    console.log({ payload });

    return this.taskService.createTask(payload);
  }

  @Patch('/complete/:id')
  async markTaskAsCompleted(@Param('id') task_id: string) {
    return this.taskService.markTaskAsCompleted(task_id);
  }

  @Get()
  async getAllTasks() {
    return this.taskService.getAllTasks();
  }

  @Put(':id')
  async updateTask(@Param('id') id: string, @Body() payload: any) {
    return this.taskService.updateTask(id, payload);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string) {
    return this.taskService.deleteTask(id);
  }
}
