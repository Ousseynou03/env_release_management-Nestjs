import { EntityRepository, Repository } from "typeorm";
import { Activity } from "../../typeorm/entities/Activity";

@EntityRepository(Activity)
export class ActivityRepository extends Repository<Activity> {}