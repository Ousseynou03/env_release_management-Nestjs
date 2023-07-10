import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Ticket } from "./ticket.entity";


@Entity("releas")
export class Releas {
  @PrimaryGeneratedColumn({ type: "bigint", name: "ref_release" })
  refRelease: number;

  @Column("date", { name: "date_livraison", nullable: true })
  dateLivraison: Date | null;

  @Column("date", { name: "date_prevision", nullable: true })
  datePrevision: Date | null;

  @Column("date", { name: "date_reelle", nullable: true })
  dateReelle: Date | null;

  @Column("varchar", { name: "nom_release", nullable: true, length: 255 })
  nomRelease: string | null;

  // Ticket
  @OneToMany(() => Ticket, (ticket) => ticket.release, { onDelete: "CASCADE" })
  tickets: Promise<Ticket[]>;
}