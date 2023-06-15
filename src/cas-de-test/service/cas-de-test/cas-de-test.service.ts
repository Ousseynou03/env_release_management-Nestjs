import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository, InjectDataSource } from '@nestjs/typeorm';
import { CasDeTestRepository } from 'src/cas-de-test/repository/casDeTest.repository';
import { CasDeTest } from 'src/typeorm/entities/testingManage/casDeTest.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class CasDeTestService {
    constructor(@InjectRepository(CasDeTest) private casDeTestRepository : CasDeTestRepository,
    @InjectDataSource() private dataSource: DataSource) {}


    //Méthode pour récupérer la liste des cas de test
    async getAllCasDeTest(): Promise<CasDeTest[]> {
        return this.casDeTestRepository.find();
    }

    //Méthode pour récupérer un cas de test sachant son ID
    async getCasDeTestById(refCasTest: number): Promise<CasDeTest> {
        const casDeTest = await this.casDeTestRepository.findOneBy({refCasTest});
        if (!casDeTest) {
          throw new NotFoundException(`Cas de test with ID:${refCasTest} not found`);
        }
        return casDeTest;
      }



    //Méthode pour ajouter un cas de test
    async addCasDeTest(casDeTest: CasDeTest): Promise<CasDeTest> {
        return this.casDeTestRepository.save(casDeTest);
    }


    //Méthode pour mettre à jour un cas de test
    async updateCasDeTest(casDeTest: CasDeTest): Promise<CasDeTest> {
        return this.casDeTestRepository.save(casDeTest);
    }


    //Méthode pour supprimer un cas de test
    async deleteCasDeTest(refCasTest: number): Promise<void> {
        await this.casDeTestRepository.delete({refCasTest});
    }



    //Méthode pour récupérer les visions par cas de tests
    public async getCasVisionTest(id: number): Promise<any[]> {
        const result = await this.dataSource.query(`
        SELECT
        (SELECT COUNT(*) FROM cas_de_test c, ticket t WHERE c.ref_cas_test=t.cas_de_test_ref_cas_test and t.release_ref_release=${id}) as CasDeTesTotal,
        (SELECT COUNT(*) FROM ticket WHERE ticket.cas_de_test_ref_cas_test IS NOT NULL ) as CasDeTestLieTicket,
        (SELECT COUNT(*) FROM cas_de_test c, ticket t WHERE c.ref_cas_test=t.cas_de_test_ref_cas_test and c.resultat="OK" and t.release_ref_release=${id}) as CasDeTesOK,
        (SELECT COUNT(*) FROM cas_de_test c, ticket t WHERE c.ref_cas_test=t.cas_de_test_ref_cas_test and c.resultat="KO" and t.release_ref_release=${id}) as CasDeTesKO,
        (SELECT COUNT(*) FROM cas_de_test c, ticket t WHERE c.ref_cas_test=t.cas_de_test_ref_cas_test and c.resultat="Bloquee" and t.release_ref_release=${id}) as CasDeTesBloquee,
        (SELECT COUNT(*) FROM cas_de_test c, ticket t WHERE c.ref_cas_test=t.cas_de_test_ref_cas_test and c.resultat="Non_Teste" and t.release_ref_release=${id}) as CasDeTesNonTeste,
        (SELECT COUNT(*) FROM cas_de_test c, ticket t WHERE c.ref_cas_test=t.cas_de_test_ref_cas_test and c.resultat="Hors_Perimetre" and t.release_ref_release=${id}) as CasDeTesHorsPerimetre;
        `);
        return Object.values(result[0]).map(Number);
      }
}
