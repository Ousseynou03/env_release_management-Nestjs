import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
    CreateCartographieDitwParams,
    UpdateCartographieDitwParams,
    CreateFusionDatapfProgicielParams,
    UpdateFusionDatapfProgicielParams
} from '../../../utils/types';
import { FusionDatapfProgiciel } from '../../../typeorm/entities/FusionDatapfProgiciel';
import { CartographieDitw } from '../../../typeorm/entities/CartographieDitw';
import { FusionDatapfProgicielRepository } from '../../../environments/repository/fusionDatapfProgiciel.repository';
import { CartographieDitwRepository } from '../../../environments/repository/cartographieDitw.repository';

@Injectable()
export class EnvironmentsService {

    private readonly logger = new Logger(EnvironmentsService.name)


    constructor(
        @InjectRepository(FusionDatapfProgiciel)
        private fusionDatapfProgicielRepository: FusionDatapfProgicielRepository,
        @InjectRepository(CartographieDitw)
        private cartographieDitwRepository: CartographieDitwRepository
    ) {}

//    findFusionDatapfProgiciels() {
  //      return this.fusionDatapfProgicielRepository.find();
    //}
    async findFusionDatapfProgiciels() {
        try {
          this.logger.log('Message de log');
          return await this.fusionDatapfProgicielRepository.find();
        } catch (error) {
          this.logger.error('Erreur lors de la recherche de FusionDatapfProgiciels', error);
          throw error;
        }
      }

    findCartographieDitws() {
        return this.cartographieDitwRepository.find();
    }

    createFusionDatapfProgiciel(fusionDatapfProgiciel: CreateFusionDatapfProgicielParams) {
        const newFusionDatapfProgiciel = this.fusionDatapfProgicielRepository.create({
            ...fusionDatapfProgiciel,
            createdAt: new Date(),
        });
        return this.fusionDatapfProgicielRepository.save(newFusionDatapfProgiciel);
    }

    createCartographieDitw(cartographieDitw: CreateCartographieDitwParams) {
        const newCartographieDitw = this.cartographieDitwRepository.create({
            ...cartographieDitw,
            createdAt: new Date(),
        });
        return this.cartographieDitwRepository.save(newCartographieDitw);
    }

    updateFusionDatapfProgiciel(id: number, updateFusionDatapfProgicielDetails: UpdateFusionDatapfProgicielParams) {
        return this.fusionDatapfProgicielRepository.update({ id }, { ...updateFusionDatapfProgicielDetails });
    }

    updateCartographieDitw(id: number, updateCartographieDitwDetails: UpdateCartographieDitwParams) {
        return this.cartographieDitwRepository.update({ id }, { ...updateCartographieDitwDetails });
    }

    deleteFusionDatapfProgiciel(id: number) {
        return this.fusionDatapfProgicielRepository.delete({ id });
    }

    deleteCartographieDitw(id: number) {
        return this.cartographieDitwRepository.delete({ id });
    }
}
