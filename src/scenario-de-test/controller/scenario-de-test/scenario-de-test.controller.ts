import { Body, Controller, Delete, Get, InternalServerErrorException, Param, Post, Put } from '@nestjs/common';
import { ScenarioDeTestService } from 'src/scenario-de-test/service/scenario-de-test/scenario-de-test.service';
import { ScenarioDeTest } from 'src/typeorm/entities/testingManage/scenarioDeTest.entity';

@Controller('scenarioManager')
export class ScenarioDeTestController {
    constructor(private readonly scenarioDeTestServiceImpl : ScenarioDeTestService){}

    //API de récupération de la liste des scenario de test
    @Get('/')
    public async getScenario() : Promise<ScenarioDeTest[]> {
        return this.scenarioDeTestServiceImpl.getAllScenario();
    }

    //API de récupération de un scenario de test sachant son id
    @Get(':id')
    public async getScenarioDeTestById(@Param('id') refScenario : number) : Promise<ScenarioDeTest>{
        return this.scenarioDeTestServiceImpl.getScenarioDeTestById(refScenario);
    }


    //API pour ajouter un scenario de test
    @Post('/')
    public async createSceanrioDeTest(@Body() scenarioDeTest : ScenarioDeTest) : Promise<ScenarioDeTest>{
        try {
            return await this.scenarioDeTestServiceImpl.addScenarioDeTest(scenarioDeTest);
        } catch (error) {
            throw new InternalServerErrorException('Une erreur est survenue lors de l\'ajout d\'un scenario de test');
            }
        }

    //API pour modifier un scenario de test
    @Put(':id')
    public async updateScenarioDeTest(@Param('id') refScenario: number, @Body() scenarioDeTest : ScenarioDeTest) : Promise<ScenarioDeTest>{
        scenarioDeTest.refScenario = refScenario;
        return this.scenarioDeTestServiceImpl.updateScenarioDeTest(scenarioDeTest);
    }


    //API pour supprimer un scenario de test
    @Delete(':id')
    public async deleteScenario(@Param('id') refScenario : number) : Promise<void>{
        await this.scenarioDeTestServiceImpl.deleteScenarioDeTest(refScenario);
    }

    
    //Récupération de la liste des cas de test pour chaque scenario
    @Get('casTest/:id')
    public async getScenarioTestForCasTest(@Param('id') id : number):Promise<ScenarioDeTest[]>{
        return this.scenarioDeTestServiceImpl.getAllScenarioCasDeTest(id);
    }
}
