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
import { CreateActivityDto } from '../../dtos/CreateActivity.dto';
import { UpdateActivityDto } from '../../dtos/UpdateActivity.dto';
import { ActivitiesService } from '../../services/activities/activities.service';

@Controller('api/activities')
export class ActivitiesController {
    constructor(private activityService: ActivitiesService) {}

    @Get()
    getPlannings() {
        return this.activityService.findActivities();
    }

    @Post('create')
    createActivity(@Body() createActivityDto: CreateActivityDto) {
        return this.activityService.createActivity(createActivityDto);
    }

    @Put(':id/update')
    async updateActivityById(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateActivityDto: UpdateActivityDto,
    ) {
        await this.activityService.updateActivity(id, updateActivityDto);
    }

    @Delete(':id/delete')
    async deleteActivityById(@Param('id', ParseIntPipe) id: number) {
        await this.activityService.deleteActivity(id);
    }
}
