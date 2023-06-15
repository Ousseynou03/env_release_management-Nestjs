import { Test, TestingModule } from '@nestjs/testing';
import { TesteurController } from './testeur.controller';

describe('TesteurController', () => {
  let controller: TesteurController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TesteurController],
    }).compile();

    controller = module.get<TesteurController>(TesteurController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
