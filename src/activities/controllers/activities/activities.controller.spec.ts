import { Test, TestingModule } from '@nestjs/testing';
import { ActivitiesController } from './activities.controller';
import { ActivitiesService } from '../../../activities/services/activities/activities.service';
import { Activity } from '../../../typeorm/entities/Activity';
import { ActivityRepository } from '../../../activities/repository/activities.repository';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('ActivitiesController', () => {
  let controller: ActivitiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ActivitiesService,
        {
          provide: getRepositoryToken(Activity),
          useValue: ActivityRepository,
        },
      ],
      controllers: [ActivitiesController],
    }).compile();

    controller = module.get<ActivitiesController>(ActivitiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
