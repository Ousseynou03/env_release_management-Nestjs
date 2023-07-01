import { Task } from "../../typeorm/entities/Task";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {}