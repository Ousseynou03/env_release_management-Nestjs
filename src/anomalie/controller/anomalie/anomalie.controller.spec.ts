import { Test, TestingModule } from '@nestjs/testing';
import { AnomalieController } from './anomalie.controller';
import { AnomalieService } from '../../../anomalie/service/anomalie/anomalie.service';
import { Anomalie } from '../../../typeorm/entities/testingManage/anomalie.entity';
import { AnomalieRepository } from '../../../anomalie/repository/anomalie.repository';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('AnomalieController', () => {
  let controller: AnomalieController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnomalieService,
        {
          provide: getRepositoryToken(Anomalie),
          useValue: AnomalieRepository,
        },
      ],
      controllers: [AnomalieController],
    }).compile();

    controller = module.get<AnomalieController>(AnomalieController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
