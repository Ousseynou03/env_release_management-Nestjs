import { Test, TestingModule } from '@nestjs/testing';
import { TicketService } from './ticket.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TicketRepository } from '../../../ticket/repository/ticket.repository';
import { Ticket } from '../../../typeorm/entities/testingManage/ticket.entity';
import { DataSource } from 'typeorm';

describe('TicketService', () => {
  let service: TicketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TicketService, DataSource,
        {
          provide: getRepositoryToken(Ticket),
          useValue: TicketRepository,        
        },
      ],
    }).compile();

    service = module.get<TicketService>(TicketService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
