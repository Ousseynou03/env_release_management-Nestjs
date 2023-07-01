import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Activity } from '../../../typeorm/entities/Activity';
import { Repository } from 'typeorm';
import {
  CreateActivityParams,
  UpdateActivityParams,
} from '../../../utils/types';
import { ActivityRepository } from '../../../activities/repository/activities.repository';

@Injectable()
export class ActivitiesService {

  private readonly logger = new Logger(ActivitiesService.name);


  constructor(
    @InjectRepository(Activity)
    private activityRepository: ActivityRepository
  ) {}

  findActivities() {
    try {
      this.logger.log('Fetching activities...');
      return this.activityRepository.find();
    } catch (error) {
      this.logger.error('Failed to fetch activities.', error);
      throw error;
    }
  }
  
  createActivity(activity: CreateActivityParams) {
    try {
      this.logger.log('Creating new activity...');
      const newActivity = this.activityRepository.create({
        ...activity,
        createdAt: new Date(),
      });
      return this.activityRepository.save(newActivity);
    } catch (error) {
      this.logger.error('Failed to create activity.', error);
      throw error;
    }
  }
  
  updateActivity(id: number, updateActivityDetails: UpdateActivityParams) {
    try {
      this.logger.log(`Updating activity with ID ${id}...`);
      return this.activityRepository.update({ id }, { ...updateActivityDetails });
    } catch (error) {
      this.logger.error(`Failed to update activity with ID ${id}.`, error);
      throw error;
    }
  }
  
  deleteActivity(id: number) {
    try {
      this.logger.log(`Deleting activity with ID ${id}...`);
      return this.activityRepository.delete({ id });
    } catch (error) {
      this.logger.error(`Failed to delete activity with ID ${id}.`, error);
      throw error;
    }
}
}
