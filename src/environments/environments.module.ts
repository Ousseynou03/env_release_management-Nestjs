import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartographieDitw } from 'src/typeorm/entities/CartographieDitw';
import { FusionDatapfProgiciel } from 'src/typeorm/entities/FusionDatapfProgiciel';
import { EnvironmentsController } from './controllers/environments/environments.controller';
import { EnvironmentsService } from './services/environments/environments.service';

@Module({
    imports: [TypeOrmModule.forFeature([FusionDatapfProgiciel, CartographieDitw])],
    controllers: [EnvironmentsController],
    providers: [EnvironmentsService],
})
export class EnvironmentsModule {}
