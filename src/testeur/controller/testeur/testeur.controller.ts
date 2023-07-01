import { Body, Controller, Delete, Get, InternalServerErrorException, Param, Post, Put } from '@nestjs/common';
import { TesteurService } from '../../../testeur/service/testeur/testeur.service';
import { Testeur } from '../../../typeorm/entities/testingManage/testeur.entity';

@Controller('testeurManager')
export class TesteurController {
    constructor(private readonly testeurServiceImpl : TesteurService){}


    //API de récupération de la liste des testeurs
    @Get('/')
    public async getTesteur() : Promise<Testeur[]> {
        return this.testeurServiceImpl.getAllTesteur();
    }

    //API de récupération d'un testeur sachant son id
    @Get(':id')
    public async getTesteurById(@Param('id') idTesteur : number) : Promise<Testeur>{
        return this.testeurServiceImpl.getTesteurById(idTesteur);
    }


    //API pour ajouter un testeur
    @Post('/')
    public async createTesteur(@Body() testeur : Testeur) : Promise<Testeur>{
        try {
            return await this.testeurServiceImpl.addTesteur(testeur);
        } catch (error) {
            throw new InternalServerErrorException('Une erreur est survenue lors de l\'ajout d\'un testeur');
            }
        }

    //API pour modifier un testeur
    @Put(':id')
    public async updateTesteur(@Param('id') idTesteur: number, @Body() testeur : Testeur) : Promise<Testeur>{
        testeur.idTesteur = idTesteur;
        return this.testeurServiceImpl.updateTesteur(testeur);
    }


    //API pour supprimer un testeur
    @Delete(':id')
    public async deleteTesteur(@Param('id') idTesteur : number) : Promise<void>{
        await this.testeurServiceImpl.deleteTesteur(idTesteur);
    }
}
