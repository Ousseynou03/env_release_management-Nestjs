import { Test, TestingModule } from '@nestjs/testing';
import { EnvironmentsController } from './environments.controller';
import { EnvironmentsService } from '../../../environments/services/environments/environments.service';
import { FusionDatapfProgiciel } from '../../../typeorm/entities/FusionDatapfProgiciel';
import { CartographieDitw } from '../../../typeorm/entities/CartographieDitw';
import { getRepositoryToken } from '@nestjs/typeorm/dist';
import { FusionDatapfProgicielRepository } from '../../../environments/repository/fusionDatapfProgiciel.repository';
import { CartographieDitwRepository } from '../../../environments/repository/cartographieDitw.repository';

describe('EnvironmentsController', () => {
  let controller: EnvironmentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EnvironmentsService,
        {
          provide: getRepositoryToken(CartographieDitw),
          useValue: CartographieDitwRepository,

        //  provide: getRepositoryToken(FusionDatapfProgiciel),
         // useValue: FusionDatapfProgicielRepository, 
        
        },
      ],
      controllers: [EnvironmentsController],
    }).compile();

    controller = module.get<EnvironmentsController>(EnvironmentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
