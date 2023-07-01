import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository, InjectDataSource } from '@nestjs/typeorm';
import { ReleasRepository } from '../../../releas/repository/releas.repository';
import { Releas } from '../../../typeorm/entities/testingManage/releas.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class ReleasService {

    private readonly logger = new Logger(ReleasService.name);
    constructor(@InjectRepository(Releas) private releasRepository : ReleasRepository,
    @InjectDataSource() private dataSource: DataSource) {}


    //Méthode pour récupérer la liste des Releases
  /*
    async getAllRelease(): Promise<Releas[]> {
        return this.releasRepository.find({relations : {tickets:true}});
    }
*/

async getAllRelease(): Promise<Releas[]> {
    try {
      this.logger.log('Fetching all releases...');
      return this.releasRepository.find({ relations: { tickets: true } });
    } catch (error) {
      this.logger.error('Failed to fetch releases.', error);
      throw error;
    }
  }


    //Méthode pour récupérer une release sachant son id
    async getReleasById(refRelease: number): Promise<Releas> {
        try {
          this.logger.log(`Fetching release with ID ${refRelease}...`);
          const releas = await this.releasRepository.findOne({ where: { refRelease }, relations: { tickets: true } });
          if (!releas) {
            throw new NotFoundException(`Release with ID:${refRelease} not found`);
          }
          return releas;
        } catch (error) {
          this.logger.error(`Failed to fetch release with ID ${refRelease}.`, error);
          throw error;
        }
      }
    


    //Méthode pour ajouter une release
    async addReleas(releas: Releas): Promise<Releas> {
        try {
          this.logger.log('Adding new release...', releas);
          return this.releasRepository.save(releas);
        } catch (error) {
          this.logger.error('Failed to add release.', error);
          throw error;
        }
      }

    //Méthode pour mettre à jour une release
    async updateReleas(releas: Releas): Promise<Releas> {
        try {
          this.logger.log('Updating release...', releas);
          return this.releasRepository.save(releas);
        } catch (error) {
          this.logger.error('Failed to update release.', error);
          throw error;
        }
      }
      
     //Méthode pour supprimer une release
     async deleteReleas(refRelease: number): Promise<void> {
        try {
          this.logger.log(`Deleting release with ID ${refRelease}...`);
          await this.releasRepository.delete({ refRelease });
        } catch (error) {
          this.logger.error(`Failed to delete release with ID ${refRelease}.`, error);
          throw error;
        }
      }


    //Récupération de la liste des tickets pour chaque release
    async findReleasesWithTickets(): Promise<any[]> {
        try {
          this.logger.log('Fetching releases with tickets...');
          const result = await this.dataSource.query(`SELECT * FROM releas LEFT JOIN ticket ON releas.ref_release = ticket.release_ref_release`);
          this.logger.log('Fetched releases with tickets:', result);
          return result;
        } catch (error) {
          this.logger.error('Failed to fetch releases with tickets.', error);
          throw error;
        }
      }
      
}
