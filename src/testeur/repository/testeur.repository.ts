import { Testeur } from "src/typeorm/entities/testingManage/testeur.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Testeur)
export class TesteurRepository extends Repository<Testeur> {}