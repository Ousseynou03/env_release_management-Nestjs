import { Test, TestingModule } from '@nestjs/testing';
import { TicketController } from './ticket.controller';
import { TicketService } from '../../../ticket/service/ticket/ticket.service';
import { Ticket } from '../../../typeorm/entities/testingManage/ticket.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TicketRepository } from '../../../ticket/repository/ticket.repository';

describe('TicketController', () => {
  let controller: TicketController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TicketService,
        {
          provide: getRepositoryToken(Ticket),
          useValue: TicketRepository,        
        },
      ],
      controllers: [TicketController],
    }).compile();

    controller = module.get<TicketController>(TicketController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
