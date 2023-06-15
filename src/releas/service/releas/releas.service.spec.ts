import { Test, TestingModule } from '@nestjs/testing';
import { ReleasService } from './releas.service';

describe('ReleasService', () => {
  let service: ReleasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReleasService],
    }).compile();

    service = module.get<ReleasService>(ReleasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
