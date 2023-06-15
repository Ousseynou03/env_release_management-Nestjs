import { ScenarioDeTest } from "src/typeorm/entities/testingManage/scenarioDeTest.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(ScenarioDeTest)
export class ScenarioDeTestRepository extends Repository<ScenarioDeTest> {}