import { CartographieDitw } from "../../typeorm/entities/CartographieDitw";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(CartographieDitw)
export class CartographieDitwRepository extends Repository<CartographieDitw> {}