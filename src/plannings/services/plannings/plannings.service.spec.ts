import { Test, TestingModule } from '@nestjs/testing';
import { PlanningsService } from './plannings.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Planning } from '../../../typeorm/entities/Planning';
import { PlanningRepository } from '../../../plannings/repository/planning.repository';


describe('PlanningsService', () => {
  let service: PlanningsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlanningsService,
        {
          provide: getRepositoryToken(Planning),
          useValue: PlanningRepository,        
        },
      ],
    }).compile();

    service = module.get<PlanningsService>(PlanningsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
