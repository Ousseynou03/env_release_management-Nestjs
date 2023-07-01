import { Test, TestingModule } from '@nestjs/testing';
import { IndisponibilitiesController } from './indisponibilities.controller';
import { IndisponibilitiesService } from '../../../indisponibilities/services/indisponibilities/indisponibilities.service';
import { Indisponibility } from '../../../typeorm/entities/Indisponibility';
import { IndisponibilityRepository } from '../../../indisponibilities/repository/indisponibility.repository';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('IndisponibilitiesController', () => {
  let controller: IndisponibilitiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IndisponibilitiesService,
        {
          provide: getRepositoryToken(Indisponibility),
          useValue: IndisponibilityRepository,        
        },
      ],
      controllers: [IndisponibilitiesController],
    }).compile();

    controller = module.get<IndisponibilitiesController>(IndisponibilitiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
