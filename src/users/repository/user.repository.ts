import { User } from "../../typeorm/entities/User";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(User)
export class UserRepository extends Repository<User> {}