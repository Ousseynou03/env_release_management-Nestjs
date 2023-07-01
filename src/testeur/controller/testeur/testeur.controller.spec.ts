import { Test, TestingModule } from '@nestjs/testing';
import { TesteurController } from './testeur.controller';
import { TesteurService } from '../../../testeur/service/testeur/testeur.service';
import { Testeur } from '../../../typeorm/entities/testingManage/testeur.entity';
import { TesteurRepository } from '../../../testeur/repository/testeur.repository';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('TesteurController', () => {
  let controller: TesteurController;

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

    controller = module.get<TesteurController>(TesteurController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
