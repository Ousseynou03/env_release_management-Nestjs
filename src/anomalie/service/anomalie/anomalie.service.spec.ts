import { Test, TestingModule } from '@nestjs/testing';
import { AnomalieService } from './anomalie.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AnomalieRepository } from '../../../anomalie/repository/anomalie.repository';
import { Anomalie } from '../../../typeorm/entities/testingManage/anomalie.entity';
import { AnomalieController } from '../../../anomalie/controller/anomalie/anomalie.controller';

describe('AnomalieService', () => {
  let service: AnomalieService;

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

    service = module.get<AnomalieService>(AnomalieService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
