import { Test, TestingModule } from '@nestjs/testing';
import { CasDeTestController } from './cas-de-test.controller';

describe('CasDeTestController', () => {
  let controller: CasDeTestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CasDeTestController],
    }).compile();

    controller = module.get<CasDeTestController>(CasDeTestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
