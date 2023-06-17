import {Profile} from './Profile';

export class User {
  id?: string;
  nom: string;
  prenom: string;
  tel?: string;
  email: string;
  dateNaissance?: string;
  active?: boolean;
  profile: Profile
  civilite?: string;
  adresse?: string;
  lieu?: string;
  ville?: string;
  etudeLevel?: string;
  experienceLevel?: string;
  actualDomain?: string;
  searchDomain?: string;

  constructor() {
    this.id = Math.random().toString(36).substring(2);
  }
}
