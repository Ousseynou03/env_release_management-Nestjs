import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository, InjectDataSource } from '@nestjs/typeorm';
import { AnomalieRepository } from 'src/anomalie/repository/anomalie.repository';
import { Anomalie } from 'src/typeorm/entities/testingManage/anomalie.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class AnomalieService {
    constructor(@InjectRepository(Anomalie) private anomalieRepository:AnomalieRepository,
    @InjectDataSource() private dataSource: DataSource){}


       //Methode pour récupérer la liste des anomalies
       async getAllAnomalie(): Promise<Anomalie[]> {
        return this.anomalieRepository.find();
    }



    //Méthode de récupération d'une anomalie sachant son id
    async getAnomalieById(refAnomalie: number): Promise<Anomalie> {
        const anomalie = await this.anomalieRepository.findOneBy({refAnomalie});
        if (!anomalie) {
          throw new NotFoundException(`Anomalie with ID:${refAnomalie} not found`);
        }
        return anomalie;
      }

    //Méthode pour ajouter une anomalie
    async addAnomalie(anomalie: Anomalie): Promise<Anomalie> {
      return this.anomalieRepository.save(anomalie);
    }

    //Méthode pour la mise à jour d'une anomalie
    async updateAnomalie(anomalie: Anomalie): Promise<Anomalie> {
        return this.anomalieRepository.save(anomalie);
    }

    //Méthode pour supprimer une anomalie
    async deleteAnomalie(refAnomalie: number): Promise<void> {
        await this.anomalieRepository.delete({refAnomalie});
      }
}
