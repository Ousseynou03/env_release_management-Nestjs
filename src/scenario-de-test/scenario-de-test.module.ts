import { Module } from '@nestjs/common';
import { ScenarioDeTestService } from './service/scenario-de-test/scenario-de-test.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScenarioDeTest } from '../typeorm/entities/testingManage/scenarioDeTest.entity';
import { ScenarioDeTestController } from './controller/scenario-de-test/scenario-de-test.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ScenarioDeTest])],
  providers: [ScenarioDeTestService],
  controllers: [ScenarioDeTestController]
})
export class ScenarioDeTestModule {}
