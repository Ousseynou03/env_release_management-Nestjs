import { Test, TestingModule } from '@nestjs/testing';
import { ScenarioDeTestController } from './scenario-de-test.controller';
import { ScenarioDeTestService } from '../../../scenario-de-test/service/scenario-de-test/scenario-de-test.service';
import { ScenarioDeTest } from '../../../typeorm/entities/testingManage/scenarioDeTest.entity';
import { ScenarioDeTestRepository } from '../../../scenario-de-test/repository/scenarioDeTest.repository';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('ScenarioDeTestController', () => {
  let controller: ScenarioDeTestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ScenarioDeTestService,
        {
          provide: getRepositoryToken(ScenarioDeTest),
          useValue: ScenarioDeTestRepository,        
        },
      ],
      controllers: [ScenarioDeTestController],
    }).compile();

    controller = module.get<ScenarioDeTestController>(ScenarioDeTestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
