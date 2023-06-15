import { Resultat } from "src/typeorm/enums/resultat.enum";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ScenarioDeTest } from "./scenarioDeTest.entity";
import { Ticket } from "./ticket.entity";

@Entity("cas_de_test")
export class CasDeTest {
  @PrimaryGeneratedColumn({type : "bigint",name: "ref_cas_test" })
  refCasTest: number;

  @Column("varchar", { name: "resultat", nullable: true, length: 38 })
  resultat: Resultat | null;

  @OneToMany(
    () => ScenarioDeTest,
    (scenarioDeTest) => scenarioDeTest.casDeTest
  )
  scenarioDeTests: ScenarioDeTest[];

  //Ticket
  @OneToMany(() => Ticket, (ticket) => ticket.casDeTest)
  ticket: Ticket[];
}