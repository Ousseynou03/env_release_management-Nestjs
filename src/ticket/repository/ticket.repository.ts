import { Ticket } from "../../typeorm/entities/testingManage/ticket.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Ticket)
export class TicketRepository extends Repository<Ticket> {

    async findAllTicketsOfRelease(id: number): Promise<Ticket[]> {
        const query = this.createQueryBuilder('ticket')
          .leftJoinAndSelect('ticket.releas', 'releas')
          .where('releas.refRelease = :id', { id })
          .getMany();
    
        return query;
      }
}