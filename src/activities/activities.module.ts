import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivitiesController } from '../activities/controllers/activities/activities.controller';
import { ActivitiesService } from '../activities/services/activities/activities.service';
import { Activity } from '../typeorm/entities/Activity';

@Module({
  imports: [TypeOrmModule.forFeature([Activity])],
  controllers: [ActivitiesController],
  providers: [ActivitiesService],
})
export class ActivitiesModule {}
