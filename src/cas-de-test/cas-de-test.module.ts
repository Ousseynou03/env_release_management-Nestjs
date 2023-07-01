import { Module } from '@nestjs/common';
import { CasDeTestService } from './service/cas-de-test/cas-de-test.service';
import { CasDeTest } from '../typeorm/entities/testingManage/casDeTest.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CasDeTestController } from './controller/cas-de-test/cas-de-test.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CasDeTest])],
  providers: [CasDeTestService],
  controllers: [CasDeTestController]
})
export class CasDeTestModule {}
