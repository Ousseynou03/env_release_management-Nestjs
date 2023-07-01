import { Test, TestingModule } from '@nestjs/testing';
import { CasDeTestService } from './cas-de-test.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CasDeTestRepository } from '../../../cas-de-test/repository/casDeTest.repository';
import { CasDeTest } from '../../../typeorm/entities/testingManage/casDeTest.entity';

describe('CasDeTestService', () => {
  let service: CasDeTestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CasDeTestService,
        {
          provide: getRepositoryToken(CasDeTest),
          useValue: CasDeTestRepository,
        },
      ],
    }).compile();

    service = module.get<CasDeTestService>(CasDeTestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
