import { Test, TestingModule } from '@nestjs/testing';
import { IndisponibilitiesService } from './indisponibilities.service';

describe('IndisponibilitiesService', () => {
  let service: IndisponibilitiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IndisponibilitiesService],
    }).compile();

    service = module.get<IndisponibilitiesService>(IndisponibilitiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
