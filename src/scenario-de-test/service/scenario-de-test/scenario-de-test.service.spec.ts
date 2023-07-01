import { Test, TestingModule } from '@nestjs/testing';
import { ScenarioDeTestService } from './scenario-de-test.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ScenarioDeTestRepository } from '../../../scenario-de-test/repository/scenarioDeTest.repository';
import { ScenarioDeTest } from '../../../typeorm/entities/testingManage/scenarioDeTest.entity';

describe('ScenarioDeTestService', () => {
  let service: ScenarioDeTestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ScenarioDeTestService,
        {
          provide: getRepositoryToken(ScenarioDeTest),
          useValue: ScenarioDeTestRepository,        
        },
      ],
    }).compile();

    service = module.get<ScenarioDeTestService>(ScenarioDeTestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
