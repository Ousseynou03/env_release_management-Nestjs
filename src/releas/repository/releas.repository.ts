import { Releas } from "src/typeorm/entities/testingManage/releas.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Releas)
export class ReleasRepository extends Repository<Releas> {}