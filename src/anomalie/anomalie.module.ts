import { Module } from '@nestjs/common';
import { AnomalieService } from './service/anomalie/anomalie.service';
import { Anomalie } from '../typeorm/entities/testingManage/anomalie.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnomalieController } from './controller/anomalie/anomalie.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Anomalie])],
  providers: [AnomalieService],
  controllers: [AnomalieController]
})
export class AnomalieModule {}
