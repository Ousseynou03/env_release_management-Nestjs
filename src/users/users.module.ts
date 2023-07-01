import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { jwtConfig } from '../config/jwt.config';
import { User } from '../typeorm/entities/User';
import { UsersController } from './controllers/users/users.controller';
import { JwtStrategy } from './jwt.strategy';
import { UsersService } from './services/users/users.service';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [TypeOrmModule.forFeature([User]), ConfigModule.forRoot(), JwtModule.registerAsync(jwtConfig)],
    controllers: [UsersController],
    providers: [UsersService, JwtStrategy],
})
export class UsersModule {}
