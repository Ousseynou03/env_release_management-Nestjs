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
import { EnvironmentsService } from 'src/environments/services/environments/environments.service';
import { CreateCartographieDitwDto } from '../../dtos/CreateCartographieDitw.dto';
import { UpdateCartographieDitwDto } from '../../dtos/UpdateCartographieDitw.dto';
import { CreateFusionDatapfProgicielDto } from '../../dtos/CreateFusionDatapfProgiciel.dto';
import { UpdateFusionDatapfProgicielDto } from '../../dtos/UpdateFusionDatapfProgiciel.dto';

import { FusionDatapfProgiciel } from '../../../typeorm/entities/FusionDatapfProgiciel';
import { CartographieDitw } from '../../../typeorm/entities/CartographieDitw';

@Controller('api/environments/')
export class EnvironmentsController {
    constructor(private environmentService: EnvironmentsService) {}

    @Get('fusionDatapfProgiciels')
    getFusionDatapfProgiciels() {
        return this.environmentService.findFusionDatapfProgiciels();
    }

    @Get('cartographieDitws')
    getCartographieDitws() {
        return this.environmentService.findCartographieDitws();
    }

    @Post('fusionDatapfProgiciel/create')
    createFusionDatapfProgiciel(@Body() createFusionDatapfProgicielDto: CreateFusionDatapfProgicielDto) {
        return this.environmentService.createFusionDatapfProgiciel(createFusionDatapfProgicielDto);
    }

    @Post('cartographieDitw/create')
    createCartographieDitw(@Body() createCartographieDitwDto: CreateCartographieDitwDto) {
        return this.environmentService.createCartographieDitw(createCartographieDitwDto);
    }

    @Put(':id/fusionDatapfProgiciel/update')
    async updateFusionDatapfProgicielById(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateFusionDatapfProgicielDto: UpdateFusionDatapfProgicielDto,
    ) {
        await this.environmentService.updateFusionDatapfProgiciel(id, updateFusionDatapfProgicielDto);
    }

    @Put(':id/cartographieDitw/update')
    async updateCartographieDitwById(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateCartographieDitwDto: UpdateCartographieDitwDto,
    ) {
        await this.environmentService.updateCartographieDitw(id, updateCartographieDitwDto);
    }

    @Delete(':id/fusionDatapfProgiciel/delete')
    async deleteFusionDatapfProgicielById(@Param('id', ParseIntPipe) id: number) {
        await this.environmentService.deleteFusionDatapfProgiciel(id);
    }

    @Delete(':id/cartographieDitw/delete')
    async deleteCartographieDitwById(@Param('id', ParseIntPipe) id: number) {
        await this.environmentService.deleteCartographieDitw(id);
    }
}
