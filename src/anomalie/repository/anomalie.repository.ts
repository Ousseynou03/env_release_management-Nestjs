import { Anomalie } from "src/typeorm/entities/testingManage/anomalie.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Anomalie)
export class AnomalieRepository extends Repository<Anomalie> {}