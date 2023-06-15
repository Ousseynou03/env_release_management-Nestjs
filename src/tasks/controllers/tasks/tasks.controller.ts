import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateTaskDto } from '../../dtos/CreateTask.dto';
import { UpdateTaskDto } from '../../dtos/UpdateTask.dto';
import { TasksService } from '../../services/tasks/tasks.service';

@Controller('api/tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getTasks() {
    return this.taskService.findTasks();
  }

  @Delete(':id/delete')
  async deleteTaskById(@Param('id', ParseIntPipe) id: number) {
    await this.taskService.deleteTask(id);
  }

  @Post(':id/create')
  createTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    return this.taskService.createPlanningTask(id, createTaskDto);
  }

  @Put(':id')
  async updateTaskById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    await this.taskService.updatePlanningTask(id, updateTaskDto);
  }
}
