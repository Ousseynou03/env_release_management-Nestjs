import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreatePlanningDto } from '../../dtos/CreatePlanning.dto';
import { UpdatePlanningDto } from '../../dtos/UpdatePlanning.dto';
import { PlanningsService } from '../../services/plannings/plannings.service';

@Controller('api/plannings')
export class PlanningsController {
  constructor(private planningService: PlanningsService) {}

  @Get()
  getPlannings() {
    return this.planningService.findPlannings();
  }

  @Post('create')
  createPlanning(@Body() createPlanningDto: CreatePlanningDto) {
    return this.planningService.createPlanning(createPlanningDto);
  }

  @Put(':id/update')
  async updatePlanningById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePlanningDto: UpdatePlanningDto,
  ) {
    await this.planningService.updatePlanning(id, updatePlanningDto);
  }

  @Delete(':id/delete')
  async deletePlanningById(@Param('id', ParseIntPipe) id: number) {
    await this.planningService.deletePlanning(id);
  }
}
