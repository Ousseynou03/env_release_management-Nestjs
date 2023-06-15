import { Body, Controller, Delete, Get, InternalServerErrorException, Param, Post, Put } from '@nestjs/common';
import { AnomalieService } from 'src/anomalie/service/anomalie/anomalie.service';
import { Anomalie } from 'src/typeorm/entities/testingManage/anomalie.entity';

@Controller('anomalieManager')
export class AnomalieController {
    constructor(private readonly anomalieServiceImpl : AnomalieService){}


    //API de récupération de la liste des anomalie
    @Get('/')
    public async getAnomalie() : Promise<Anomalie[]> {
        return this.anomalieServiceImpl.getAllAnomalie();
    }

    //API de récupération de l'anomalie sachant son id
    @Get(':id')
    public async getAnomalieById(@Param('id') refAnomalie : number) : Promise<Anomalie>{
        return this.anomalieServiceImpl.getAnomalieById(refAnomalie);
    }


    //API pour ajouter une anomalie
    @Post('/')
    public async createAnomalie(@Body() anomalie : Anomalie) : Promise<Anomalie>{
    try {
        return await this.anomalieServiceImpl.addAnomalie(anomalie);
    } catch (error) {
        throw new InternalServerErrorException('Une erreur est survenue lors de l\'ajout de l\'anomalie');
        }
    }

    
    //API pour modifier une anomalie
    //@Put(':id')
    //public async updateAnomalie(@Param('id') id: number ,@Body() anomalie : Anomalie) : Promise<Anomalie>{
      //  return this.anomalieServiceImpl.updateAnomalie(id, anomalie);
   // }

   //API pour modifier une anomalie
    @Put(':id')
    public async updateAnomalie(@Param('id') refAnomalie: number, @Body() anomalie: Anomalie): Promise<Anomalie> {
        anomalie.refAnomalie = refAnomalie;
            return this.anomalieServiceImpl.updateAnomalie(anomalie);
    }



    //API pour supprimer une anomalie
    @Delete(':id')
    public async deleteAnomalie(@Param('id') refAnomalie : number) : Promise<void>{
        await this.anomalieServiceImpl.deleteAnomalie(refAnomalie);
    }

}
