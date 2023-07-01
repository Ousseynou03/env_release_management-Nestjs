import { Cloturee } from "../../../typeorm/enums/cloturee.enum";
import { Criticite } from "../../../typeorm/enums/criticite.enum";
import { EnCours } from "../../../typeorm/enums/enCours.enum";
import { Priorite } from "../../../typeorm/enums/priorite.enum";
import { Statut } from "../../../typeorm/enums/statut.enum";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Ticket } from "./ticket.entity";

@Entity("anomalie")
export class Anomalie {
  @PrimaryGeneratedColumn({type : "bigint", name: "ref_anomalie" })
  refAnomalie: number;


  @Column("varchar", { name: "cloturee", nullable: true, length: 30 })
  cloturee: Cloturee | null;


  @Column("varchar", { name: "criticite", nullable: true, length: 30 })
  criticite: Criticite | null;


  @Column("varchar", { name: "en_cours", nullable: true, length: 30 })
  enCours: EnCours | null;


  @Column("varchar", { name: "priorite", nullable: true, length: 30 })
  priorite: Priorite | null;


  @Column("varchar", { name: "statut", nullable: true, length: 30 })
  statut: Statut | null;

  
  //Ticket
  @OneToMany(() => Ticket, (ticket) => ticket.anomalies)
  ticket:Promise<Ticket[]>;
}