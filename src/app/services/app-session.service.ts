import { Injectable } from '@angular/core';
import {BaseService} from './base.service';
import {HttpClient} from '@angular/common/http';
import {BASE_URL, environment} from '../../environments/environment';
import {Planning} from '../models/planning-model';
import {Task} from '../models/task';
import {Activity} from '../models/activity-model';
import {Indisponibilite} from '../models/indisponibilite-model';
import {CartographieDitw, FusionDatapfProgiciels} from '../models/environment-classes';
import * as envs_data from '../models/environments-data';
import * as moment from 'moment';
import 'rxjs-compat/add/operator/do';
import 'rxjs-compat/add/operator/shareReplay';
import {Profile} from '../models/Profile';

@Injectable({
  providedIn: 'root'
})
export class AppSessionService extends BaseService {
  redirect_url: string;
  env_data = envs_data.arrayData;

  constructor(protected _http: HttpClient) {
    super(_http);
  }

  savePlanning(planning: Planning) {
    const url = `${environment.SRV_URL}/plannings/create`;
    return this.postRequest(url, planning, false);
  }

  getPlannings() {
    const url = `${environment.SRV_URL}/plannings`;
    return this.getRequest(url);
  }

  deletePlanning(id) {
    const url = `${environment.SRV_URL}/plannings/${id}/delete`;
    return this.deleteRequest(url);
  }

  saveTask(task: Task) {
    const url = `${environment.SRV_URL}/tasks/${task.planningId}/create`;
    return this.postRequest(url, task, false);
  }

  getTasks() {
    const url = `${environment.SRV_URL}/tasks`;
    return this.getRequest(url);
  }

  deleteTask(id) {
    const url = `${environment.SRV_URL}/tasks/${id}/delete`;
    return this.deleteRequest(url);
  }

  saveActivity(activity: Activity) {
    const url = `${environment.SRV_URL}/activities/create`;
    return this.postRequest(url, activity, false);
  }

  getActivities() {
    const url = `${environment.SRV_URL}/activities`;
    return this.getRequest(url);
  }

  deleteActivity(id) {
    const url = `${environment.SRV_URL}/activities/${id}/delete`;
    return this.deleteRequest(url);
  }

  saveInd(ind: Indisponibilite) {
    const url = `${environment.SRV_URL}/indisponibilities/create`;
    return this.postRequest(url, ind, false);
  }

  getInds() {
    const url = `${environment.SRV_URL}/indisponibilities`;
    return this.getRequest(url);
  }

  deleteInd(id) {
    const url = `${environment.SRV_URL}/indisponibilities/${id}/delete`;
    return this.deleteRequest(url);
  }

  getFunctionExecute(id) {
    const functionName = this.env_data.filter( elt => {
      return (elt.id).toString() === id
    })[0].getFunction;
    return this[functionName]();
  }

  saveFunctionExecute(env, id) {
    const functionName = this.env_data.filter( elt => {
      return (elt.id).toString() === id
    })[0].saveFunction;
    return this[functionName](env);
  }

  getEnvironments(id) {
    return this.getFunctionExecute(id)
  }

  saveEnvironment(env, id) {
    return this.saveFunctionExecute(env, id)
  }

  saveFusionData(fusionDatapfProgiciel: FusionDatapfProgiciels) {
    const url = `${environment.SRV_URL}/environments/fusionDatapfProgiciel/create`;
    return this.postRequest(url, fusionDatapfProgiciel, false);
  }

  getFusionData() {
    const url = `${environment.SRV_URL}/environments/fusionDatapfProgiciels`;
    return this.getRequest(url);
  }

  deleteFusionData(id) {
    const url = `${environment.SRV_URL}/environments/fusionDatapfProgiciels/${id}/delete`;
    return this.deleteRequest(url);
  }

  saveCart(cartographieDitw: CartographieDitw) {
    const url = `${environment.SRV_URL}/environments/cartographieDitw/create`;
    return this.postRequest(url, cartographieDitw, false);
  }

  getCarts() {
    const url = `${environment.SRV_URL}/environments/cartographieDitws`;
    return this.getRequest(url);
  }

  deleteCart(id) {
    const url = `${environment.SRV_URL}/environments/cartographieDitws/${id}/delete`;
    return this.deleteRequest(url);
  }

  setSession(authResult) {
    const expiresAt = moment().add(authResult.expiresIn, 'minutes');
    localStorage.setItem('profile', JSON.stringify(Profile.user));
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()) );
  }

  login(formValue) {
    const url = `${environment.SRV_URL}/users/login`;
    return this.postRequest(url, formValue, false).do(res => this.setSession(res)).shareReplay();
  }

  getUser() {
    const url = `${environment.SRV_URL}/users/user`;
    return this.getRequest(url, false);
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    return new Promise(
        (resolve) => {
          //resolve()
        });
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  getRole() {
    return (JSON.parse(localStorage.getItem('profile')));
  }

  //Testing Manage


postTesteur(data: any) {
  const url = `${BASE_URL}/testeurManager`;
  return this._http.post<any>(url, data);
}

getTesteur(id: number) {
  const url = `${BASE_URL}/testeurManager/${id}`;
  return this.getRequest(url);
}

getAllTesteur() {
  const url = `${BASE_URL}/testeurManager`;
  return this.getRequest(url);
}

putTesteur(data: any, id: number) {
  const url = `${BASE_URL}/testeurManager/${id}`;
  return this._http.put<any>(url, data);
}

deleteTesteur(id: number) {
  const url = `${BASE_URL}/testeurManager/${id}`;
  return this._http.delete<any>(url);
}


  //Release Manage

postRelease(data: any) {
  const url = `${BASE_URL}/releaseManager`;
  return this._http.post<any>(url, data);
}

getAllRelease() {
  const url = `${BASE_URL}/releaseManager`;
  return this._http.get<any>(url);
}

putRelease(data: any, id: number) {
  const url = `${BASE_URL}/releaseManager/${id}`;
  return this._http.put<any>(url, data);
}

getRelease(id: number) {
  const url = `${BASE_URL}/releaseManager/${id}`;
  return this._http.get<any>(url);
}

deleteRelease(id: number) {
  const url = `${BASE_URL}/releaseManager/${id}`;
  return this._http.delete<any>(url);
}

  identifiantRelease(){
    return localStorage.getItem('id');
  }

  //Anomalie Manage

  postAnomalie(data: any) {
    const url = `${BASE_URL}/anomalieManager`;
    return this._http.post<any>(url, data);
  }
  
  getAllAnomalie() {
    const url = `${BASE_URL}/anomalieManager`;
    return this._http.get<any>(url);
  }
  
  putAnomalie(data: any, id: number) {
    const url = `${BASE_URL}/anomalieManager/${id}`;
    return this._http.put<any>(url, data);
  }
  
  getAnomalie(id: number) {
    const url = `${BASE_URL}/anomalieManager/${id}`;
    return this._http.get<any>(url);
  }
  
  deleteAnomalie(id: number) {
    const url = `${BASE_URL}/anomalieManager/${id}`;
    return this._http.delete<any>(url);
  }
  

  //Ticket Manage

  postTicket(data: any) {
    const url = `${BASE_URL}/ticketManager`;
    return this._http.post<any>(url, data);
  }
  
  getAllTicket() {
    const url = `${BASE_URL}/ticketManager`;
    return this._http.get<any>(url);
  }
  
  getVisionTicket(id: number) {
    const url = `${BASE_URL}/ticketManager/visionsTicket/${id}`;
    return this._http.get<any>(url);
  }
  
  getVisionBloquante(id: number) {
    const url = `${BASE_URL}/ticketManager/visionsBloquante/${id}`;
    return this._http.get<any>(url);
  }
  
  getVisionMajeuret(id: number) {
    const url = `${BASE_URL}/ticketManager/visionsMajeure/${id}`;
    return this._http.get<any>(url);
  }
  
  getVisionMineure(id: number) {
    const url = `${BASE_URL}/ticketManager/visionsMineure/${id}`;
    return this._http.get<any>(url);
  }
  
  getAllTicketForRelease(id: number) {
    const url = `${BASE_URL}/ticketManager/ticketRelease/${id}`;
    return this._http.get<any>(url);
  }
  
  getTicket(id: number) {
    const url = `${BASE_URL}/ticketManager/${id}`;
    return this._http.get<any>(url);
  }
  
  putTicket(data: any, id: number) {
    const url = `${BASE_URL}/ticketManager/${id}`;
    return this._http.put<any>(url, data);
  }
  
  deleteTicket(id: number) {
    const url = `${BASE_URL}/ticketManager/${id}`;
    return this._http.delete<any>(url);
  }


  //Cas De Test Manage

 
postCasTest(data: any) {
  const url = `${BASE_URL}/casTestManager`;
  return this._http.post<any>(url, data);
}

getAllCasTest() {
  const url = `${BASE_URL}/casTestManager`;
  return this._http.get<any>(url);
}

getCasTest(id: number) {
  const url = `${BASE_URL}/casTestManager/${id}`;
  return this._http.get<any>(url);
}

putCasTest(data: any, id: number) {
  const url = `${BASE_URL}/casTestManager/${id}`;
  return this._http.put<any>(url, data);
}

deleteCasTest(id: number) {
  const url = `${BASE_URL}/casTestManager/${id}`;
  return this._http.delete<any>(url);
}

getVisionCasTest(id: number) {
  const url = `${BASE_URL}/casTestManager/visionCasTest/${id}`;
  return this._http.get<any>(url);
}

  //Scenario de test Manage
  postScenario(data: any) {
    const url = `${BASE_URL}/scenarioManager`;
    return this._http.post<any>(url, data);
  }
  
  getAllScenario() {
    const url = `${BASE_URL}/scenarioManager`;
    return this._http.get<any>(url);
  }
  
  getAllScenarioForCasTest(id: number) {
    const url = `${BASE_URL}/scenarioManager/casTest/${id}`;
    return this._http.get<any>(url);
  }
  
  putScenario(data: any, id: number) {
    const url = `${BASE_URL}/scenarioManager/${id}`;
    return this._http.put<any>(url, data);
  }
  
  deleteScenario(id: number) {
    const url = `${BASE_URL}/scenarioManager/${id}`;
    return this._http.delete<any>(url);
  }
}