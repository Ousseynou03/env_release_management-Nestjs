import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository, InjectDataSource } from '@nestjs/typeorm';
import { AnomalieRepository } from '../../../anomalie/repository/anomalie.repository';
import { Anomalie } from '../../../typeorm/entities/testingManage/anomalie.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class AnomalieService {

  private readonly logger = new Logger(AnomalieService.name);

    constructor(@InjectRepository(Anomalie) private anomalieRepository:AnomalieRepository,
    @InjectDataSource() private dataSource: DataSource){}


    async getAllAnomalie(): Promise<Anomalie[]> {
      try {
        this.logger.log('Fetching all anomalies...');
        return this.anomalieRepository.find();
      } catch (error) {
        this.logger.error('Failed to fetch anomalies.', error);
        throw error;
      }
    }
    
    async getAnomalieById(refAnomalie: number): Promise<Anomalie> {
      try {
        this.logger.log(`Fetching anomaly with ID ${refAnomalie}...`);
        const anomalie = await this.anomalieRepository.findOneBy({ refAnomalie });
        if (!anomalie) {
          throw new NotFoundException(`Anomalie with ID:${refAnomalie} not found`);
        }
        return anomalie;
      } catch (error) {
        this.logger.error(`Failed to fetch anomaly with ID ${refAnomalie}.`, error);
        throw error;
      }
    }
    
    async addAnomalie(anomalie: Anomalie): Promise<Anomalie> {
      try {
        this.logger.log('Adding new anomaly...');
        return this.anomalieRepository.save(anomalie);
      } catch (error) {
        this.logger.error('Failed to add anomaly.', error);
        throw error;
      }
    }
    
    async updateAnomalie(anomalie: Anomalie): Promise<Anomalie> {
      try {
        this.logger.log('Updating anomaly...');
        return this.anomalieRepository.save(anomalie);
      } catch (error) {
        this.logger.error('Failed to update anomaly.', error);
        throw error;
      }
    }
    
    async deleteAnomalie(refAnomalie: number): Promise<void> {
      try {
        this.logger.log(`Deleting anomaly with ID ${refAnomalie}...`);
        await this.anomalieRepository.delete({ refAnomalie });
      } catch (error) {
        this.logger.error(`Failed to delete anomaly with ID ${refAnomalie}.`, error);
        throw error;
      }
    }
    
    
}
