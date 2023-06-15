import { Module } from '@nestjs/common';
import { PlanningsController } from './controllers/plannings/plannings.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Planning} from "../typeorm/entities/Planning";
import {PlanningsService} from "./services/plannings/plannings.service";

@Module({
  imports: [TypeOrmModule.forFeature([Planning])],
  controllers: [PlanningsController],
  providers: [PlanningsService],
})
export class PlanningsModule {}
