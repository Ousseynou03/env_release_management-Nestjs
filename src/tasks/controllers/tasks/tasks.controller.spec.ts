import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from '../../../tasks/services/tasks/tasks.service';
import { Task } from '../../../typeorm/entities/Task';
import { TaskRepository } from '../../../tasks/repository/task.repository';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('TasksController', () => {
  let controller: TasksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(Task),
          useValue: TaskRepository,        
        },
      ],
      controllers: [TasksController],
    }).compile();

    controller = module.get<TasksController>(TasksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
