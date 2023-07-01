import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository, InjectDataSource } from '@nestjs/typeorm';
import { ScenarioDeTestRepository } from '../../../scenario-de-test/repository/scenarioDeTest.repository';
import { ScenarioDeTest } from '../../../typeorm/entities/testingManage/scenarioDeTest.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class ScenarioDeTestService {

  private readonly logger = new Logger(ScenarioDeTestService.name);

    constructor(@InjectRepository(ScenarioDeTest) private scenarioDeTestRepository : ScenarioDeTestRepository,
    @InjectDataSource() private dataSource: DataSource){}


 
  async getAllScenario(): Promise<ScenarioDeTest[]> {
  try {
    this.logger.log('Fetching all scenarios...');
    return this.scenarioDeTestRepository
      .createQueryBuilder('scenario')
      .leftJoinAndSelect('scenario.casDeTest', 'casDeTest')
      .getMany();
  } catch (error) {
    this.logger.error('Failed to fetch scenarios.', error);
    throw error;
  }
}

async getScenarioDeTestById(refScenario: number): Promise<ScenarioDeTest> {
  try {
    this.logger.log(`Fetching scenario de test with ID ${refScenario}...`);
    const scenarioDeTest = await this.scenarioDeTestRepository.findOneBy({ refScenario });
    if (!scenarioDeTest) {
      throw new NotFoundException(`Scenario de test with ID:${refScenario} not found`);
    }
    return scenarioDeTest;
  } catch (error) {
    this.logger.error(`Failed to fetch scenario de test with ID ${refScenario}.`, error);
    throw error;
  }
}

async updateScenarioDeTest(scenarioDeTest: ScenarioDeTest): Promise<ScenarioDeTest> {
  try {
    this.logger.log('Updating scenario de test...', scenarioDeTest);
    return this.scenarioDeTestRepository.save(scenarioDeTest);
  } catch (error) {
    this.logger.error('Failed to update scenario de test.', error);
    throw error;
  }
}

async addScenarioDeTest(scenarioDeTest: ScenarioDeTest): Promise<ScenarioDeTest> {
  try {
    this.logger.log('Adding new scenario de test...', scenarioDeTest);
    return this.scenarioDeTestRepository.save(scenarioDeTest);
  } catch (error) {
    this.logger.error('Failed to add scenario de test.', error);
    throw error;
  }
}

async deleteScenarioDeTest(refScenario: number): Promise<void> {
  try {
    this.logger.log(`Deleting scenario de test with ID ${refScenario}...`);
    await this.scenarioDeTestRepository.delete(refScenario);
  } catch (error) {
    this.logger.error(`Failed to delete scenario de test with ID ${refScenario}.`, error);
    throw error;
  }
}

async getAllScenarioCasDeTest(id: number): Promise<ScenarioDeTest[]> {
  try {
    this.logger.log(`Fetching all scenarios for cas de test with ID ${id}...`);
    const results = await this.scenarioDeTestRepository
      .createQueryBuilder('scenario')
      .leftJoinAndSelect('scenario.casDeTest', 'casDeTest')
      .where('scenario.casDeTest = :id', { id })
      .getMany();

    return results.map((result) =>
      this.scenarioDeTestRepository.create({
        refScenario: result.refScenario,
        scenario: result.scenario,
        casDeTest: result.casDeTest,
      })
    );
  } catch (error) {
    this.logger.error(`Failed to fetch scenarios for cas de test with ID ${id}.`, error);
    throw error;
  }
}
}