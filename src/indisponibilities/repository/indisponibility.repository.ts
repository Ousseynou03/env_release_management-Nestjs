import { Indisponibility } from "../../typeorm/entities/Indisponibility";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Indisponibility)
export class IndisponibilityRepository extends Repository<Indisponibility> {}