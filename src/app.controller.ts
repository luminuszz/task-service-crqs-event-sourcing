import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { TaskService } from './core/task.service';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import csvParser from 'csv-parser';

import { unlink } from 'fs/promises';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class AppController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async createTask(@Body() payload: CreateTaskDto) {
    return this.taskService.createTask({
      title: payload.title,
      description: payload.description,
    });
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
  async updateTask(@Param('id') id: string, @Body() payload: UpdateTaskDto) {
    return this.taskService.updateTask(id, payload);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string) {
    return this.taskService.deleteTask(id);
  }

  @Post('/upload')
  @HttpCode(204)
  @UseInterceptors(FileInterceptor('csv', { dest: './temp' }))
  async uploadFile(@UploadedFile() csv: Express.Multer.File) {
    const itens: { title: string; description: string }[] = [];

    fs.createReadStream(csv.path)
      .pipe(csvParser())
      .on('data', (data) => {
        itens.push({ title: data.title, description: data.description });
      })
      .on('end', async () => {
        await this.taskService.createManyTasks(itens);
        await unlink(csv.path);
      });

    return null;
  }
}
