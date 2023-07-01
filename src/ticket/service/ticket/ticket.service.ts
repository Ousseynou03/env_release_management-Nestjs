import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository, InjectDataSource } from '@nestjs/typeorm';
import { TicketRepository } from '../../../ticket/repository/ticket.repository';
import { Ticket } from '../../../typeorm/entities/testingManage/ticket.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class TicketService {
    constructor(@InjectRepository(Ticket) private ticketRepository : TicketRepository,
    @InjectDataSource() private dataSource: DataSource){}


    //Méthode pour récupérer la liste des tickets
    async getAllTicket(): Promise<Ticket[]> {
        return this.ticketRepository.find()
    }



    //Méthode pour récupérer un ticket sachant son id
    async getTicketById(refTicket: number): Promise<Ticket> {
        const ticket = await this.ticketRepository.findOneBy({refTicket});
        if (!ticket) {
          throw new NotFoundException(`Ticket with ID:${refTicket} not found`);
        }
        return ticket;
      }


      



    //Méthode pour ajouter un ticket
    async addTicket(ticket: Ticket): Promise<Ticket> {
        return this.ticketRepository.save(ticket);
    }


    //Méthode pour mettre à jour un ticket
    async updateTicket(ticket: Ticket): Promise<Ticket> {
        return this.ticketRepository.save(ticket);
    }


    //Méthode pour supprimer un ticket
    async deleteTicket(refTicket: number): Promise<void> {
        await this.ticketRepository.delete(refTicket);
    }

    //Récupération de la liste des tickets pour chaque release
   // async AllTicketRelease(id : number) : Promise<Ticket[]>{
     //   return await this.dataSource.query(`SELECT * FROM ticket JOIN releas ON ticket.release_ref_release = releas.ref_release WHERE releas.ref_release=${id}`);
    //}

    async AllTicketRelease(id: number): Promise<Ticket[]> {
        const results = await this.ticketRepository
          .createQueryBuilder('ticket')
          .leftJoinAndSelect('ticket.testeur', 'testeur')
          .leftJoinAndSelect('ticket.release', 'release')
          .leftJoinAndSelect('ticket.anomalies', 'anomalies')
          .leftJoinAndSelect('ticket.casDeTest', 'casDeTest')
          .where('release.refRelease = :id', { id })
          .getMany();
    
        return results.map((result) =>
          this.ticketRepository.create({
            refTicket: result.refTicket,
            titre: result.titre,
            type: result.type,
            testeur: result.testeur,
            release: result.release,
            anomalies: result.anomalies,
            casDeTest: result.casDeTest,
          }),
        );
      }
                
      



    //Vision par ticket
    async visonTicket(id: number): Promise<number[]> {
        if (!id) {
            throw new BadRequestException('id is required');
        }
        const result = await this.dataSource.query(`
        SELECT
        (SELECT COUNT(*) FROM ticket t WHERE t.release_ref_release=${id}) as TicketToTal,
        (SELECT COUNT(*) FROM ticket t WHERE t.cas_de_test_ref_cas_test IS NOT NULL and t.release_ref_release=${id}) as TicketCouvert,
        (SELECT COUNT(*) FROM ticket t, cas_de_test c WHERE c.ref_cas_test=t.cas_de_test_ref_cas_test and c.resultat="OK" and t.release_ref_release=${id}) as OK,
        (SELECT COUNT(*) FROM ticket t, cas_de_test c WHERE c.ref_cas_test=t.cas_de_test_ref_cas_test and c.resultat="KO" and t.release_ref_release=${id}) as KO,
        (SELECT COUNT(*) FROM ticket t, cas_de_test c WHERE c.ref_cas_test=t.cas_de_test_ref_cas_test and c.resultat="Non_Teste" and t.release_ref_release=${id}) as NonTeste,
        (SELECT COUNT(*) FROM ticket t, cas_de_test c WHERE c.ref_cas_test=t.cas_de_test_ref_cas_test and c.resultat="Abandonnes" and t.release_ref_release=${id}) as Abandonnes,
        (SELECT COUNT(*) FROM ticket t, cas_de_test c WHERE c.ref_cas_test=t.cas_de_test_ref_cas_test and c.resultat="Bloquee" and t.release_ref_release=${id}) as Bloquee,
        (SELECT COUNT(*) FROM ticket t, cas_de_test c WHERE c.ref_cas_test=t.cas_de_test_ref_cas_test and c.resultat="Hors_Perimetre" and t.release_ref_release=${id}) as Hors_Perimetre
        `);
        return Object.values(result[0]).map(Number);
    }
    
    

    //Vision par anomalie bloquante
    async visionAnomalieBloquant(id: number): Promise<number[]> {
        if (!id) {
            throw new BadRequestException('id is required');
        }
        const result = await this.dataSource.query(`
        SELECT
        (SELECT COUNT(*) FROM ticket t, anomalie a WHERE t.anomalies_ref_anomalie=a.ref_anomalie and a.criticite="BLOQUANTE" and a.en_cours="A_TRAITES" and t.release_ref_release=${id}) as BLAT, 
        (SELECT COUNT(*) FROM ticket t, anomalie a WHERE t.anomalies_ref_anomalie=a.ref_anomalie and a.criticite="BLOQUANTE" and a.en_cours="CORRIGEES" and t.release_ref_release=${id}) as BLCO, 
        (SELECT COUNT(*) FROM ticket t, anomalie a WHERE t.anomalies_ref_anomalie=a.ref_anomalie and a.criticite="BLOQUANTE" and a.en_cours="VERIFICATION" and t.release_ref_release=${id}) as BLVE, 
        (SELECT COUNT(*) FROM ticket t, anomalie a WHERE t.anomalies_ref_anomalie=a.ref_anomalie and a.criticite="BLOQUANTE" and a.cloturee="ValidationCorrectifs" and t.release_ref_release=${id}) as BLVC, 
        (SELECT COUNT(*) FROM ticket t, anomalie a WHERE t.anomalies_ref_anomalie=a.ref_anomalie and a.criticite="BLOQUANTE" and a.cloturee="Rejetees" and t.release_ref_release=${id}) as BLRE, 
        (SELECT COUNT(*) FROM ticket t, anomalie a WHERE t.anomalies_ref_anomalie=a.ref_anomalie and a.criticite="BLOQUANTE" and a.cloturee="ProblemeDocumentaire" and t.release_ref_release=${id}) as BLPD, 
        (SELECT COUNT(*) FROM ticket t, anomalie a WHERE t.anomalies_ref_anomalie=a.ref_anomalie and a.criticite="BLOQUANTE" and a.cloturee="ArbitrageProjetEvolution" and t.release_ref_release=${id}) as BLAPE
        `);
        return Object.values(result[0]).map(Number);
    }
    

    //Vision par anomalie majeure
    async visionAnomalieMajeure(id: number): Promise<number[]> {
        if (!id) {
            throw new BadRequestException('id is required');
        }
        const result = await this.dataSource.query(`
        SELECT
        (SELECT COUNT(*) FROM ticket t, anomalie a WHERE t.anomalies_ref_anomalie=a.ref_anomalie and a.criticite="MAJEURE" and a.en_cours="A_TRAITES" and t.release_ref_release=${id}) as BLAT,
        (SELECT COUNT(*) FROM ticket t, anomalie a WHERE t.anomalies_ref_anomalie=a.ref_anomalie and a.criticite="MAJEURE" and a.en_cours="CORRIGEES" and t.release_ref_release=${id}) as BLCO,
        (SELECT COUNT(*) FROM ticket t, anomalie a WHERE t.anomalies_ref_anomalie=a.ref_anomalie and a.criticite="MAJEURE" and a.en_cours="VERIFICATION" and t.release_ref_release=${id}) as BLVE,
        (SELECT COUNT(*) FROM ticket t, anomalie a WHERE t.anomalies_ref_anomalie=a.ref_anomalie and a.criticite="MAJEURE" and a.cloturee="ValidationCorrectifs" and t.release_ref_release=${id}) as BLVC,
        (SELECT COUNT(*) FROM ticket t, anomalie a WHERE t.anomalies_ref_anomalie=a.ref_anomalie and a.criticite="MAJEURE" and a.cloturee="Rejetees" and t.release_ref_release=${id}) as BLRE,
        (SELECT COUNT(*) FROM ticket t, anomalie a WHERE t.anomalies_ref_anomalie=a.ref_anomalie and a.criticite="MAJEURE" and a.cloturee="ProblemeDocumentaire" and t.release_ref_release=${id}) as BLPD,
        (SELECT COUNT(*) FROM ticket t, anomalie a WHERE t.anomalies_ref_anomalie=a.ref_anomalie and a.criticite="MAJEURE" and a.cloturee="ArbitrageProjetEvolution" and t.release_ref_release=${id}) as BLAPE
        `);
        return Object.values(result[0]).map(Number);
    }

        //Vision par anomalie majeure
    async visionAnomalieMineure(id: number): Promise<any> {
        if (!id) {
            throw new BadRequestException('id is required');
        }
        const result = await this.dataSource.query(`
        SELECT
        (SELECT COUNT(*) FROM ticket t, anomalie a WHERE t.anomalies_ref_anomalie=a.ref_anomalie and a.criticite="MINEURE" and a.en_cours="A_TRAITES" and t.release_ref_release=${id}) as BLAT, 
        (SELECT COUNT(*) FROM ticket t, anomalie a WHERE t.anomalies_ref_anomalie=a.ref_anomalie and a.criticite="MINEURE" and a.en_cours="CORRIGEES" and t.release_ref_release=${id}) as BLCO, 
        (SELECT COUNT(*) FROM ticket t, anomalie a WHERE t.anomalies_ref_anomalie=a.ref_anomalie and a.criticite="MINEURE" and a.en_cours="VERIFICATION" and t.release_ref_release=${id}) as BLVE, 
        (SELECT COUNT(*) FROM ticket t, anomalie a WHERE t.anomalies_ref_anomalie=a.ref_anomalie and a.criticite="MINEURE" and a.cloturee="ValidationCorrectifs" and t.release_ref_release=${id}) as BLVC, 
        (SELECT COUNT(*) FROM ticket t, anomalie a WHERE t.anomalies_ref_anomalie=a.ref_anomalie and a.criticite="MINEURE" and a.cloturee="Rejetees" and t.release_ref_release=${id}) as BLRE, 
        (SELECT COUNT(*) FROM ticket t, anomalie a WHERE t.anomalies_ref_anomalie=a.ref_anomalie and a.criticite="MINEURE" and a.cloturee="ProblemeDocumentaire" and t.release_ref_release=${id}) as BLPD, 
        (SELECT COUNT(*) FROM ticket t, anomalie a WHERE t.anomalies_ref_anomalie=a.ref_anomalie and a.criticite="MINEURE" and a.cloturee="ArbitrageProjetEvolution" and t.release_ref_release=${id}) as BLAPE
        `);
        return Object.values(result[0]).map(Number);
    }
}
