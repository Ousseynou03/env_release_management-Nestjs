import { Test, TestingModule } from '@nestjs/testing';
import { CasDeTestController } from './cas-de-test.controller';
import { CasDeTestService } from '../../../cas-de-test/service/cas-de-test/cas-de-test.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CasDeTest } from '../../../typeorm/entities/testingManage/casDeTest.entity';
import { CasDeTestRepository } from '../../../cas-de-test/repository/casDeTest.repository';

describe('CasDeTestController', () => {
  let controller: CasDeTestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CasDeTestService,
        {
          provide: getRepositoryToken(CasDeTest),
          useValue: CasDeTestRepository,
        },
      ],
      controllers: [CasDeTestController],
    }).compile();

    controller = module.get<CasDeTestController>(CasDeTestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
