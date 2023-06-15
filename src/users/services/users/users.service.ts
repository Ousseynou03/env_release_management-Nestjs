import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { Repository } from 'typeorm';
import {
    CreateUserParams,
} from '../../../utils/types';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ) {
    }

    async create(user: CreateUserParams): Promise<User> {
        const newUser = this.userRepository.create({
            ...user,
            createdAt: new Date(),
        });
        return this.userRepository.save(newUser);
    }

    async findOne(condition: any): Promise<User> {
        return this.userRepository.findOne({where: {email: condition}});
    }
    async findOneById(condition: any): Promise<User> {
        return this.userRepository.findOne({where: {id: condition}});
    }
    
}
