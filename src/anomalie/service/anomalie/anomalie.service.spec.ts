import { Test, TestingModule } from '@nestjs/testing';
import { AnomalieService } from './anomalie.service';

describe('AnomalieService', () => {
  let service: AnomalieService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnomalieService],
    }).compile();

    service = module.get<AnomalieService>(AnomalieService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
