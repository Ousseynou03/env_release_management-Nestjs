import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Ticket } from "./ticket.entity";


@Entity("releas")
export class Releas {
  @PrimaryGeneratedColumn({type : "bigint", name: "ref_release" })
  refRelease: number;

  @Column("datetime", { name: "date_livraison", nullable: true })
  dateLivraison: Date | null;

  @Column("datetime", { name: "date_prevision", nullable: true })
  datePrevision: Date | null;

  @Column("datetime", { name: "date_reelle", nullable: true })
  dateReelle: Date | null;

  @Column("varchar", { name: "nom_release", nullable: true, length: 255 })
  nomRelease: string | null;

  //Ticket
  @OneToMany(() => Ticket, (ticket) => ticket.release)
  tickets: Promise<Ticket[]>;
}