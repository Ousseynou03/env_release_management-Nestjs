import {Column,Entity,Index,JoinColumn,ManyToOne,PrimaryGeneratedColumn,
} from "typeorm";
import { Releas } from "./releas.entity";
import { Anomalie } from "./anomalie.entity";
import { CasDeTest } from "./casDeTest.entity";
import { Testeur } from "./testeur.entity";
import { Types } from "../../../typeorm/enums/types.enums";



@Entity("ticket")
export class Ticket {
  @PrimaryGeneratedColumn({type : "bigint", name: "ref_ticket" })
  refTicket: number;
  
  @Column("varchar", { name: "titre", nullable: true, length: 255 })
  titre: string | null;

  @Column("varchar", { name: "type", nullable: true, length: 30 })
  type: Types | null;

    //Testeur
    @ManyToOne(() => Testeur, (testeur) => testeur.ticket, {eager: true})
    @JoinColumn([
      { name: "testeur_id_testeur", referencedColumnName: "idTesteur" },
    ])
    testeur: Testeur;

  //Release
  @ManyToOne(() => Releas, (releas) => releas.tickets, {eager: true})
  @JoinColumn([
    { name: "release_ref_release", referencedColumnName: "refRelease"},
  ])
  release: Releas;


  //Anomalie
  @ManyToOne(() => Anomalie, (anomalie) => anomalie.ticket, {eager: true})
  @JoinColumn([
    { name: "anomalies_ref_anomalie", referencedColumnName: "refAnomalie"}
  ])
  anomalies: Anomalie;


  //Cas de test
  @ManyToOne(() => CasDeTest, (casDeTest) => casDeTest.ticket, {eager: true})
  @JoinColumn([
    { name: "cas_de_test_ref_cas_test", referencedColumnName: "refCasTest" },
  ])
  casDeTest: CasDeTest;



}