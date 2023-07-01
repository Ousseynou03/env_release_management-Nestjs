import { FusionDatapfProgiciel } from "../../typeorm/entities/FusionDatapfProgiciel";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(FusionDatapfProgiciel)
export class FusionDatapfProgicielRepository extends Repository<FusionDatapfProgiciel> {}