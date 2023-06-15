import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository, InjectDataSource } from '@nestjs/typeorm';
import { ReleasRepository } from 'src/releas/repository/releas.repository';
import { Releas } from 'src/typeorm/entities/testingManage/releas.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class ReleasService {
    constructor(@InjectRepository(Releas) private releasRepository : ReleasRepository,
    @InjectDataSource() private dataSource: DataSource) {}


    //Méthode pour récupérer la liste des Releases
    async getAllRelease(): Promise<Releas[]> {
        return this.releasRepository.find({relations : {tickets:true}});
    }


    //Méthode pour récupérer une release sachant son id
    async getReleasById(refRelease: number): Promise<Releas> {
        const releas = await this.releasRepository.findOne({where: {refRelease}, relations: {tickets: true}});
        if (!releas) {
            throw new NotFoundException(`release with ID:${refRelease} not found`);
        }
        return releas;
    }
    


    //Méthode pour ajouter une release
    async addReleas(releas: Releas): Promise<Releas> {
        return this.releasRepository.save(releas);
    }

    //Méthode pour mettre à jour une release
    async updateReleas(releas: Releas): Promise<Releas> {
        return this.releasRepository.save(releas);
    }


    //Méthode pour supprimer une release
    async deleteReleas(refRelease: number): Promise<void> {
        await this.releasRepository.delete({refRelease})
    }



    //Récupération de la liste des tickets pour chaque release
    async findReleasesWithTickets(): Promise<any[]> {
        return await this.dataSource.query(`SELECT * FROM releas LEFT JOIN ticket ON releas.ref_release = ticket.release_ref_release`);
      }
}
