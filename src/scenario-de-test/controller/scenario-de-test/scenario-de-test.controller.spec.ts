import { Test, TestingModule } from '@nestjs/testing';
import { ScenarioDeTestController } from './scenario-de-test.controller';

describe('ScenarioDeTestController', () => {
  let controller: ScenarioDeTestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScenarioDeTestController],
    }).compile();

    controller = module.get<ScenarioDeTestController>(ScenarioDeTestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
