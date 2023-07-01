import { Test, TestingModule } from '@nestjs/testing';
import { IndisponibilitiesService } from './indisponibilities.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { IndisponibilityRepository } from '../../../indisponibilities/repository/indisponibility.repository';
import { Indisponibility } from '../../../typeorm/entities/Indisponibility';

describe('IndisponibilitiesService', () => {
  let service: IndisponibilitiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IndisponibilitiesService,
        {
          provide: getRepositoryToken(Indisponibility),
          useValue: IndisponibilityRepository,        
        },
      ],
    }).compile();

    service = module.get<IndisponibilitiesService>(IndisponibilitiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
