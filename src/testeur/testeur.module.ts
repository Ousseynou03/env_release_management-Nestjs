import { Module } from '@nestjs/common';
import { TesteurService } from './service/testeur/testeur.service';
import { Testeur } from '../typeorm/entities/testingManage/testeur.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TesteurController } from './controller/testeur/testeur.controller';


@Module({
  imports: [TypeOrmModule.forFeature([Testeur])],
  providers: [TesteurService],
  controllers: [TesteurController]
})
export class TesteurModule {}
