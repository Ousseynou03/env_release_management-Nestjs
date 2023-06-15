import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository, InjectDataSource } from '@nestjs/typeorm';
import { ScenarioDeTestRepository } from 'src/scenario-de-test/repository/scenarioDeTest.repository';
import { ScenarioDeTest } from 'src/typeorm/entities/testingManage/scenarioDeTest.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class ScenarioDeTestService {
    constructor(@InjectRepository(ScenarioDeTest) private scenarioDeTestRepository : ScenarioDeTestRepository,
    @InjectDataSource() private dataSource: DataSource){}


    //Méthode pour récupérer la liste des scenario de test
    //async getAllScenario(): Promise<ScenarioDeTest[]> {
      //  return this.scenarioDeTestRepository.find();
    //}

    async getAllScenario(): Promise<ScenarioDeTest[]> {
        return this.scenarioDeTestRepository
          .createQueryBuilder('scenario')
          .leftJoinAndSelect('scenario.casDeTest', 'casDeTest')
          .getMany();
      }
      


    //Méthode pour récupérer un scénario de test sachant son id
    async getScenarioDeTestById(refScenario: number): Promise<ScenarioDeTest> {
        const scenarioDeTest = await this.scenarioDeTestRepository.findOneBy({refScenario});
        if (!scenarioDeTest) {
          throw new NotFoundException(`Scenario de test with ID:${refScenario} not found`);
        }
        return scenarioDeTest;
      }
    //Méthode pour mettre à jour un scenario de test
    async updateScenarioDeTest(scenarioDeTest: ScenarioDeTest): Promise<ScenarioDeTest> {
        return this.scenarioDeTestRepository.save(scenarioDeTest);
    }

    //Méthode pour mettre à jour un scenario de test
    async addScenarioDeTest(scenarioDeTest: ScenarioDeTest): Promise<ScenarioDeTest> {
        return this.scenarioDeTestRepository.save(scenarioDeTest);
    }

    //Méthode pour supprimer un scenario de test
    async deleteScenarioDeTest(refScenario: number): Promise<void> {
        await this.scenarioDeTestRepository.delete(refScenario);
    }

        //Récupération de la liste des scenario pour chaque cas De TEST
        async getAllScenarioCasDeTest(id: number): Promise<ScenarioDeTest[]> {
          const results = await this.scenarioDeTestRepository
            .createQueryBuilder('scenario')
            .leftJoinAndSelect('scenario.casDeTest', 'casDeTest')
            .where('scenario.casDeTest = :id', { id })
            .getMany();
      
          return results.map((result) =>
            this.scenarioDeTestRepository.create({
              refScenario: result.refScenario,
              scenario : result.scenario,
              casDeTest: result.casDeTest,
            }),
          );
        }
}
