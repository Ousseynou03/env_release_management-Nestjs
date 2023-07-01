import { Test, TestingModule } from '@nestjs/testing';
import { TesteurService } from './testeur.service';
import { Testeur } from '../../../typeorm/entities/testingManage/testeur.entity';
import { TesteurRepository } from '../../../testeur/repository/testeur.repository';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TesteurController } from '../../../testeur/controller/testeur/testeur.controller';

describe('TesteurService', () => {
  let service: TesteurService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
            
      providers: [
        TesteurService,
        {
          provide: getRepositoryToken(Testeur),
          useValue: TesteurRepository,
        },
      ],
      controllers: [TesteurController],
    }).compile();

    service = module.get<TesteurService>(TesteurService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
