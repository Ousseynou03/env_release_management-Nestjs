import { Test, TestingModule } from '@nestjs/testing';
import { ReleasController } from './releas.controller';
import { ReleasService } from '../../../releas/service/releas/releas.service';
import { Releas } from '../../../typeorm/entities/testingManage/releas.entity';
import { ReleasRepository } from '../../../releas/repository/releas.repository';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('ReleasController', () => {
  let controller: ReleasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReleasService,
        {
          provide: getRepositoryToken(Releas),
          useValue: ReleasRepository,        
        },
      ],
      controllers: [ReleasController],
    }).compile();

    controller = module.get<ReleasController>(ReleasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
