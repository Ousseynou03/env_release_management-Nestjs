import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreatePlanningParams,
  UpdatePlanningParams,
} from '../../../utils/types';
import { Planning } from '../../../typeorm/entities/Planning';
import { PlanningRepository } from '../../../plannings/repository/planning.repository';

@Injectable()
export class PlanningsService {
  constructor(
    @InjectRepository(Planning)
    private planningRepository: PlanningRepository,
  ) {}

  findPlannings() {
    return this.planningRepository.find();
  }

  createPlanning(planning: CreatePlanningParams) {
    const newPlanning = this.planningRepository.create({
      ...planning,
      createdAt: new Date(),
    });
    return this.planningRepository.save(newPlanning);
  }

  updatePlanning(id: number, updatePlanning: UpdatePlanningParams) {
    return this.planningRepository.update({ id }, { ...updatePlanning });
  }

  deletePlanning(id: number) {
    return this.planningRepository.delete({ id });
  }
}
