import { Module } from '@nestjs/common';
import { TicketService } from './service/ticket/ticket.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from '../typeorm/entities/testingManage/ticket.entity';
import { TicketController } from './controller/ticket/ticket.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket])],
  providers: [TicketService],
  controllers: [TicketController]
})
export class TicketModule {}
