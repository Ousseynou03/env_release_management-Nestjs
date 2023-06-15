import { CasDeTest } from "src/typeorm/entities/testingManage/casDeTest.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(CasDeTest)
export class CasDeTestRepository extends Repository<CasDeTest> {}