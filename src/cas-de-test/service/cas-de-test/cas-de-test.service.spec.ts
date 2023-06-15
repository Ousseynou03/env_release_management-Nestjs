import { Test, TestingModule } from '@nestjs/testing';
import { CasDeTestService } from './cas-de-test.service';

describe('CasDeTestService', () => {
  let service: CasDeTestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CasDeTestService],
    }).compile();

    service = module.get<CasDeTestService>(CasDeTestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
