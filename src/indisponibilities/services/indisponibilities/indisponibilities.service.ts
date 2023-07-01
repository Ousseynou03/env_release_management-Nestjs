import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
    CreateIndisponibilityParams,
    UpdateIndisponibilityParams,
} from '../../../utils/types';
import { Indisponibility } from '../../../typeorm/entities/Indisponibility';
import { IndisponibilityRepository } from '../../../indisponibilities/repository/indisponibility.repository';

@Injectable()
export class IndisponibilitiesService {
    constructor(
        @InjectRepository(Indisponibility)
        private indisponibilityRepository: IndisponibilityRepository,
    ) {}

    findIndisponibilities() {
        return this.indisponibilityRepository.find();
    }

    createIndisponibilities(indisponibility: CreateIndisponibilityParams) {
        const newIndisponibility = this.indisponibilityRepository.create({
            ...indisponibility,
            createdAt: new Date(),
        });
        return this.indisponibilityRepository.save(newIndisponibility);
    }

    updateIndisponibilities(id: number, updateIndisponibility: UpdateIndisponibilityParams) {
        return this.indisponibilityRepository.update({ id }, { ...updateIndisponibility });
    }

    deleteIndisponibility(id: number) {
        return this.indisponibilityRepository.delete({ id });
    }
}
