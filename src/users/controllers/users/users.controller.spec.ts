import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from '../../../users/services/users/users.service';
import { User } from '../../../typeorm/entities/User';
import { UserRepository } from '../../../users/repository/user.repository';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('UsersController', () => {
  let controller: UsersController;
  

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: UserRepository,        
        },
      ],
      controllers: [UsersController],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
