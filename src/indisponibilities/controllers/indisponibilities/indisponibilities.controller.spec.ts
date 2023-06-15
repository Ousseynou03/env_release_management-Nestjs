import { Test, TestingModule } from '@nestjs/testing';
import { IndisponibilitiesController } from './indisponibilities.controller';

describe('IndisponibilitiesController', () => {
  let controller: IndisponibilitiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IndisponibilitiesController],
    }).compile();

    controller = module.get<IndisponibilitiesController>(IndisponibilitiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
