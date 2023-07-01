import { Planning } from "../../typeorm/entities/Planning";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Planning)
export class PlanningRepository extends Repository<Planning> {}