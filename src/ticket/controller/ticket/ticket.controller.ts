import { Body, Controller, Delete, Get, InternalServerErrorException, Param, Post, Put } from '@nestjs/common';
import { TicketService } from '../../../ticket/service/ticket/ticket.service';
import { Ticket } from '../../../typeorm/entities/testingManage/ticket.entity';

@Controller('ticketManager')
export class TicketController {
    constructor(private readonly ticketServiceImpl : TicketService){}

    //API de récupération de la liste des tickets
    @Get('/')
    public async getTicket() : Promise<Ticket[]> {
        return this.ticketServiceImpl.getAllTicket();
    }

    //API de récupération d'un ticket sachant son id
    @Get(':id')
    public async getTicketById(@Param('id') refTicket : number) : Promise<Ticket>{
        return this.ticketServiceImpl.getTicketById(refTicket);
    }


    //API pour ajouter un ticket
    @Post('/')
    public async createTicket(@Body() ticket : Ticket) : Promise<Ticket>{
        try {
            return await this.ticketServiceImpl.addTicket(ticket);
        } catch (error) {
            throw new InternalServerErrorException('Une erreur est survenue lors de l\'ajout d\'un ticket');
            }
        }

    //API pour modifier un ticket
    @Put(':id')
    public async updateTicket(@Param('id') refTicket: number,@Body() ticket : Ticket) : Promise<Ticket>{
        ticket.refTicket = refTicket;
        return this.ticketServiceImpl.updateTicket(ticket);
    }


    //API pour supprimer une anomalie
    @Delete(':id')
    public async deleteTicket(@Param('id') refTicket : number) : Promise<void>{
        await this.ticketServiceImpl.deleteTicket(refTicket);
    }


    //Récupération de la liste des tickets pour chaque release
    @Get('ticketRelease/:id')
    public async getAllTicketRelease(@Param('id') id : number):Promise<Ticket[]>{
        return this.ticketServiceImpl.AllTicketRelease(id);
    }


    //API de récupération des visions par ticket
    //@Get('visionsTicket/:id')
    //public async getVisionTicket(@Param('id') id : number): Promise<any[]>{
      //  return this.ticketServiceImpl.visonTicket(id);
   // }

   @Get('visionsTicket/:id')
    public async getVisionTicket(@Param('id') id : number): Promise<Object[]>{
        return await this.ticketServiceImpl.visonTicket(id);
    }



    //API de récupération des visions par anomalie bloquante
    @Get('visionsBloquante/:id')
    public async getVisionBloquante(@Param('id') id : number): Promise<any>{
        return this.ticketServiceImpl.visionAnomalieBloquant(id);
    }

    //API de récupération des visions par anomalie bloquante
    @Get('visionsMajeure/:id')
    public async getVisionMajeure(@Param('id') id : number): Promise<any>{
        return this.ticketServiceImpl.visionAnomalieMajeure(id);
    }

    //API de récupération des visions par anomalie bloquante
    @Get('visionsMineure/:id')
    public async getVisionMineure(@Param('id') id : number): Promise<any>{
        return this.ticketServiceImpl.visionAnomalieMineure(id);
    }
}
