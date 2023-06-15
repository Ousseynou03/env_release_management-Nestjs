import { Test, TestingModule } from '@nestjs/testing';
import { AnomalieController } from './anomalie.controller';

describe('AnomalieController', () => {
  let controller: AnomalieController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnomalieController],
    }).compile();

    controller = module.get<AnomalieController>(AnomalieController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
