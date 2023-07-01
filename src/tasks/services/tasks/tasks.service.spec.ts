import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TaskRepository } from '../../../tasks/repository/task.repository';
import { Task } from '../../../typeorm/entities/Task';
import { PlanningsService } from '../../../plannings/services/plannings/plannings.service';
import { PlanningRepository } from '../../../plannings/repository/planning.repository';


describe('TasksService', () => {
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService, PlanningsService, PlanningRepository,
        {
          provide: getRepositoryToken(Task),
          useValue: TaskRepository,        
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
