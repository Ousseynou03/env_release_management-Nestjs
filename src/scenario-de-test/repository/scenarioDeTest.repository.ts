import { ScenarioDeTest } from "../../typeorm/entities/testingManage/scenarioDeTest.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(ScenarioDeTest)
export class ScenarioDeTestRepository extends Repository<ScenarioDeTest> {}