import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Indisponibility } from '../typeorm/entities/Indisponibility';
import { IndisponibilitiesController } from './controllers/indisponibilities/indisponibilities.controller';
import { IndisponibilitiesService } from './services/indisponibilities/indisponibilities.service';

@Module({
    imports: [TypeOrmModule.forFeature([Indisponibility])],
    controllers: [IndisponibilitiesController],
    providers: [IndisponibilitiesService],
})
export class IndisponibilitiesModule {}
