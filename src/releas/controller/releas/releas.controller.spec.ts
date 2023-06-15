import { Test, TestingModule } from '@nestjs/testing';
import { ReleasController } from './releas.controller';

describe('ReleasController', () => {
  let controller: ReleasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReleasController],
    }).compile();

    controller = module.get<ReleasController>(ReleasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
