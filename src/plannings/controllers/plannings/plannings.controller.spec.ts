import { Test, TestingModule } from '@nestjs/testing';
import { PlanningsController } from './plannings.controller';
import { PlanningsService } from '../../../plannings/services/plannings/plannings.service';
import { Planning } from '../../../typeorm/entities/Planning';
import { PlanningRepository } from '../../../plannings/repository/planning.repository';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('PlanningsController', () => {
  let controller: PlanningsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlanningsService,
        {
          provide: getRepositoryToken(Planning),
          useValue: PlanningRepository,        
        },
      ],
      controllers: [PlanningsController],
    }).compile();

    controller = module.get<PlanningsController>(PlanningsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
