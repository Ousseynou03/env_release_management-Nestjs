import { Body, Controller, Delete, Get, InternalServerErrorException, Param, Post, Put } from '@nestjs/common';
import { CasDeTestService } from 'src/cas-de-test/service/cas-de-test/cas-de-test.service';
import { CasDeTest } from 'src/typeorm/entities/testingManage/casDeTest.entity';

@Controller('casTestManager')
export class CasDeTestController {
    constructor(private readonly casDeTestServiceImpl : CasDeTestService){}


    //API de récupération de la liste des cas de test
    @Get('/')
    public async getCasDeTest() : Promise<CasDeTest[]> {
        return this.casDeTestServiceImpl.getAllCasDeTest();
    }


    //API de récupération d'un cas de test sachant son id
    @Get(':id')
    public async getCasTestById(@Param('id') refcasTest : number) : Promise<CasDeTest>{
        return this.casDeTestServiceImpl.getCasDeTestById(refcasTest);
    }


    //API pour ajouter un cas de test
    @Post('/')
    public async createCasDeTest(@Body() casDeTest : CasDeTest) : Promise<CasDeTest>{
        try {
            return await this.casDeTestServiceImpl.addCasDeTest(casDeTest);
        } catch (error) {
            throw new InternalServerErrorException('Une erreur est survenue lors de l\'ajout  d\'un cas de test');
            }
        }

    //API pour modifier un un cas de test
    @Put(':id')
    public async updateCasDeTest(@Param('id') refCasTest: number, @Body() casDeTest : CasDeTest) : Promise<CasDeTest>{
        casDeTest.refCasTest = refCasTest;
        return this.casDeTestServiceImpl.updateCasDeTest(casDeTest);
    }


    //API pour supprimer un cas de test
    @Delete(':id')
    public async deleteCasDeTest(@Param('id') refCasTest : number) : Promise<void>{
        await this.casDeTestServiceImpl.deleteCasDeTest(refCasTest);
    }


    //API pour la récupération des visions par cas de test
    @Get('visionCasTest/:id')
    public async getCasVisionTest(@Param('id') id : number):Promise<Object>{
        return this.casDeTestServiceImpl.getCasVisionTest(id);
    }

}
