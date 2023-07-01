import { Test, TestingModule } from '@nestjs/testing';
import { ReleasService } from './releas.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ReleasRepository } from '../../../releas/repository/releas.repository';
import { Releas } from '../../../typeorm/entities/testingManage/releas.entity';

describe('ReleasService', () => {
  let service: ReleasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReleasService,
        {
          provide: getRepositoryToken(Releas),
          useValue: ReleasRepository,        
        },
      ],
    }).compile();

    service = module.get<ReleasService>(ReleasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
