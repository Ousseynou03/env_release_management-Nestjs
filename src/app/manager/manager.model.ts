import { Type } from "../enum/Type.model";


export interface ITesteur {
    idTesteur?: number;
    matricule?: string;
    prenom?: string;
    nom?: string;
}
export interface IAnomalie{
  refAnomalie?: number;
  cloturee?: string;
  criticite?: string;
  en_cours?: string;
  priorite?: string;
  statut?: string;
}

export interface IRelease {
  refRelease?: number;
  nomRelease?: string;
  dateLivraison?: Date;
  datePrevision?: Date;
  dateReelle?: Date;
}

export interface ICasDeTest{
  refCasTest?: number;
  resultat?: string;
}
export interface ITicket {
  refTicket?: number;
  titre?: string;
  type?: Type;
  testeur?: ITesteur | null;
  release?: IRelease | null;
  anomalies?: IAnomalie | null;
  casDeTest?: ICasDeTest | null;
}





  
export class Testeur implements ITesteur {
  constructor(public idTesteur?: number, public matricule?: string, public prenom?: string, public nom?: string) {}
}
  
export function getTesteurIdentifier(testeur: ITesteur): number | undefined {
  return testeur.idTesteur;
}

export class Release implements IRelease {
  constructor(public refRelease?: number, public nomRelease?: string,public dateLivraison?: Date, public datePrevision?: Date, public dateReelle?: Date) {}
}
  
export function getReleaseIdentifier(release: IRelease): number | undefined {
  return release.refRelease;
}

export class Ticket implements ITicket {
  constructor(public refTicket?: number, public titre?: string, public type?: Type, public testeur?: ITesteur | null, public anomalies?: IAnomalie | null) {}
}
  
export function getTicketIdentifier(ticket: ITicket): number | undefined {
  return ticket.refTicket;
}

export class Anomalie implements IAnomalie {
  constructor(public refAnomalie?: number, public cloturee?: string, public criticite?: string, public en_cours?: string, public priorite?: string, public statut?: string) {}
}
  
export function getAnomalieIdentifier(anomalie: IAnomalie): number | undefined {
  return anomalie.refAnomalie;
}

export class CasDeTest implements ICasDeTest {
  constructor(public refCasTest?: number, public resultat?: string) {}
}
  
export function getRefCasDeTestIdentifier(casDeTest: ICasDeTest): number | undefined {
  return casDeTest.refCasTest;
}