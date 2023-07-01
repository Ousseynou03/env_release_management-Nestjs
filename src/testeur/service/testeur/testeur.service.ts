import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TesteurRepository } from '../../../testeur/repository/testeur.repository';
import { Testeur } from '../../../typeorm/entities/testingManage/testeur.entity';

@Injectable()
export class TesteurService {

    private readonly logger = new Logger(TesteurService.name);
    constructor(@InjectRepository(Testeur) private testeurRepository : TesteurRepository){}

    async getAllTesteur(): Promise<Testeur[]> {
        try {
          this.logger.log('Fetching all testeurs...');
          return this.testeurRepository.find();
        } catch (error) {
          this.logger.error('Failed to fetch testeurs.', error);
          throw error;
        }
      }
      
      async getTesteurById(idTesteur: number): Promise<Testeur> {
        try {
          this.logger.log(`Fetching testeur with ID ${idTesteur}...` ,Testeur);
          const testeur = await this.testeurRepository.findOneBy({ idTesteur });
          if (!testeur) {
            throw new NotFoundException(`Testeur with ID:${idTesteur} not found`);
          }
          return testeur;
        } catch (error) {
          this.logger.error(`Failed to fetch testeur with ID ${idTesteur}.`, error);
          throw error;
        }
      }
      
      async addTesteur(testeur: Testeur): Promise<Testeur> {
        try {
          this.logger.log('Adding new testeur...', testeur);
          return this.testeurRepository.save(testeur);
        } catch (error) {
          this.logger.error('Failed to add testeur.', error);
          throw error;
        }
      }
      
      async updateTesteur(testeur: Testeur): Promise<Testeur> {
        try {
          this.logger.log('Updating testeur...', testeur);
          return this.testeurRepository.save(testeur);
        } catch (error) {
          this.logger.error('Failed to update testeur.', error);
          throw error;
        }
      }
      
      async deleteTesteur(idTesteur: number): Promise<void> {
        try {
          this.logger.log(`Deleting testeur with ID ${idTesteur}...`);
          await this.testeurRepository.delete({ idTesteur });
        } catch (error) {
          this.logger.error(`Failed to delete testeur with ID ${idTesteur}.`, error);
          throw error;
        }
      }
}
