import { Test, TestingModule } from '@nestjs/testing';
import { ScenarioDeTestService } from './scenario-de-test.service';

describe('ScenarioDeTestService', () => {
  let service: ScenarioDeTestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScenarioDeTestService],
    }).compile();

    service = module.get<ScenarioDeTestService>(ScenarioDeTestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
