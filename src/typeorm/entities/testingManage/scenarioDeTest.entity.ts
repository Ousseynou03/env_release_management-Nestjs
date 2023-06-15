import {Column,Entity,JoinColumn,ManyToOne,PrimaryGeneratedColumn} from "typeorm";
import { CasDeTest } from "./casDeTest.entity";


@Entity("scenario_de_test")
export class ScenarioDeTest {
  @PrimaryGeneratedColumn({type : "bigint",name: "ref_scenario" })
  refScenario: number;

  @Column("varchar", { name: "scenario", nullable: true, length: 300 })
  scenario: string | null;


  //Cas de Test
  @ManyToOne(() => CasDeTest, (casDeTest) => casDeTest.scenarioDeTests)
  @JoinColumn([
    { name: "cas_de_test_ref_cas_test", referencedColumnName: "refCasTest" },
  ])
  casDeTest: CasDeTest;
}