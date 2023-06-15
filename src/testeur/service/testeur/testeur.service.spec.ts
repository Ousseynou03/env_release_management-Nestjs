import { Test, TestingModule } from '@nestjs/testing';
import { TesteurService } from './testeur.service';

describe('TesteurService', () => {
  let service: TesteurService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TesteurService],
    }).compile();

    service = module.get<TesteurService>(TesteurService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
