import { Module } from '@nestjs/common';
import { ReleasService } from './service/releas/releas.service';
import { Releas } from '../typeorm/entities/testingManage/releas.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReleasController } from './controller/releas/releas.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Releas])],
  providers: [ReleasService],
  controllers: [ReleasController]
})
export class ReleasModule {}
