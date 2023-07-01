import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {CreateTaskParams, UpdatePlanningParams, UpdateTaskParams} from '../../../utils/types';
import { Task } from '../../../typeorm/entities/Task';
import { Planning } from '../../../typeorm/entities/Planning';
import { PlanningRepository } from '../../../plannings/repository/planning.repository';
import { TaskRepository } from '../../../tasks/repository/task.repository';
@Injectable()
export class TasksService {
private readonly logger = new Logger(TasksService.name)

  constructor(
    @InjectRepository(Task) private taskRepository: TaskRepository,
    @InjectRepository(Planning) private planningRepository: PlanningRepository
  ) {}

  findTasks() {
    return this.taskRepository.find({ relations: ['planning'] });
  }

  async createPlanningTask(
    id: number,
    createPlanningTaskDetails: CreateTaskParams,
  ) {
    const planning = await  this.planningRepository.findOneBy({id});
    if (!planning)
      throw new HttpException(
        'Planning not found. Cannot create Task',
        HttpStatus.BAD_REQUEST,
      );
    const newTask = this.taskRepository.create({
      ...createPlanningTaskDetails,
      planning,
      createdAt: new Date(),
    });
    return this.taskRepository.save(newTask);
  }

  updatePlanningTask(id: number, updateTaskDetails: UpdateTaskParams) {
    return this.taskRepository.update({ id }, { ...updateTaskDetails });
  }

  deleteTask(id: number) {
    return this.taskRepository.delete({ id });
  }
}
