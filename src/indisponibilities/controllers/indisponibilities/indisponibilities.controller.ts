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
import { CreateIndisponibilityDto } from '../../dtos/CreateIndisponibility.dto';
import { UpdateIndisponibilityDto } from '../../dtos/UpdateIndisponibility.dto';
import { IndisponibilitiesService } from '../../services/indisponibilities/indisponibilities.service';


@Controller('api/indisponibilities')
export class IndisponibilitiesController {
    constructor(private indisponibilityService: IndisponibilitiesService) {}

    @Get()
    getindIsponibilities() {
        return this.indisponibilityService.findIndisponibilities();
    }

    @Post('create')
    createIndisponibility(@Body() createIndisponibilityDto: CreateIndisponibilityDto) {
        return this.indisponibilityService.createIndisponibilities(createIndisponibilityDto);
    }

    @Put(':id/update')
    async updateIndisponibilityById(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateIndisponibilityDto: UpdateIndisponibilityDto,
    ) {
        await this.indisponibilityService.updateIndisponibilities(id, updateIndisponibilityDto);
    }

    @Delete(':id/delete')
    async deleteIndisponibilityById(@Param('id', ParseIntPipe) id: number) {
        await this.indisponibilityService.deleteIndisponibility(id);
    }
}
