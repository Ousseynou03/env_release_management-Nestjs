import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Activity } from '../../../typeorm/entities/Activity';
import { Repository } from 'typeorm';
import {
  CreateActivityParams,
  UpdateActivityParams,
} from '../../../utils/types';

@Injectable()
export class ActivitiesService {
  constructor(
    @InjectRepository(Activity)
    private activityRepository: Repository<Activity>,
  ) {}

  findActivities() {
    return this.activityRepository.find();
  }

  createActivity(activity: CreateActivityParams) {
    const newActivity = this.activityRepository.create({
      ...activity,
      createdAt: new Date(),
    });
    return this.activityRepository.save(newActivity);
  }

  updateActivity(id: number, updateActivityDetails: UpdateActivityParams) {
    return this.activityRepository.update({ id }, { ...updateActivityDetails });
  }

  deleteActivity(id: number) {
    return this.activityRepository.delete({ id });
  }
}
