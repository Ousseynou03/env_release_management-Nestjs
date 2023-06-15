import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Ticket } from "./ticket.entity";


@Entity("testeur")
export class Testeur {
  @PrimaryGeneratedColumn({type : "bigint",name: "id_testeur" })
  idTesteur: number;

  @Column("varchar", { name: "matricule", nullable: true, length: 255 })
  matricule: string | null;

  @Column("varchar", { name: "nom", nullable: true, length: 255 })
  nom: string | null;

  @Column("varchar", { name: "prenom", nullable: true, length: 255 })
  prenom: string | null;

  //Ticket
  @OneToMany(() => Ticket, (ticket) => ticket.testeur)
  ticket: Ticket[];
}