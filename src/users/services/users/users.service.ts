import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../typeorm/entities/User';

import {
    CreateUserParams,
} from '../../../utils/types';
import { UserRepository } from '../../../users/repository/user.repository';

@Injectable()
export class UsersService {

    private readonly logger = new Logger(UsersService.name)
    constructor(
        @InjectRepository(User) private readonly userRepository: UserRepository
    ) {
    }

    async create(user: CreateUserParams): Promise<User> {
        try {
          this.logger.log("Inscription User", user);
          const newUser = this.userRepository.create({
            ...user,
            createdAt: new Date(),
          });
          return this.userRepository.save(newUser);
        } catch (error) {
          this.logger.error("Erreur de connexion de l'utilisateur", error);
          throw error;
        }
      }

    async findOne(condition: any): Promise<User> {
        return this.userRepository.findOne({where: {email: condition}});
    }
    async findOneById(condition: any): Promise<User> {
        return this.userRepository.findOne({where: {id: condition}});
    }
    
}
