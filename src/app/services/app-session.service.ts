import { Injectable } from '@angular/core';
import {BaseService} from './base.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
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

  postTesteur(data : any){
    return this._http.post<any>("http://localhost:3000/testeurManager", data);
  }



  getTesteur(id:number){
    return this.getRequest("http://localhost:3000/testeurManager/"+id);
  }

  getAllTesteur(){
    return this.getRequest("http://localhost:3000/testeurManager");
  }

  putTesteur(data : any, id : number){
    return this._http.put<any>("http://localhost:3000/testeurManager/"+id, data);
  }

  deleteTesteur(id : number){
    return this._http.delete<any>("http://localhost:3000/testeurManager/"+id);
  }


  //Release Manage


  postRelease(data : any){
    return this._http.post<any>("http://localhost:3000/releaseManager", data);
  }

  getAllRelease(){
    return this._http.get<any>("http://localhost:3000/releaseManager");
  }

  putRelease(data : any, id : number){
    return this._http.put<any>("http://localhost:3000/releaseManager/"+id, data);
  }

  getRelease(id : number){
    return this._http.get<any>("http://localhost:3000/releaseManager/"+id);
  }

  deleteRelease(id : number){
    return this._http.delete<any>("http://localhost:3000/releaseManager/"+id);
  }

  identifiantRelease(){
    return localStorage.getItem('id');
  }

  //Anomalie Manage

  postAnomalie(data : any){
    return this._http.post<any>("http://localhost:3000/anomalieManager", data);
  }

  getAllAnomalie(){
    return this._http.get<any>("http://localhost:3000/anomalieManager");
  }

  putAnomalie(data : any, id : number){
    return this._http.put<any>("http://localhost:3000/anomalieManager/"+id, data);
  }

  getAnomalie(id : number){
    return this._http.get<any>("http://localhost:3000/anomalieManager/"+id);
  }

  deleteAnomalie(id : number){
    return this._http.delete<any>("http://localhost:3000/anomalieManager/"+id);
  }

  //Ticket Manage

  postTicket(data : any){
    return this._http.post<any>("http://localhost:3000/ticketManager", data);
  }

  getAllTicket(){
    return this._http.get<any>("http://localhost:3000/ticketManager");
  }

  getVisionTicket(id: number){
    return this._http.get<any>("http://localhost:3000/ticketManager/visionsTicket/"+id);
  }

  getVisionBloquante(id: number){
    return this._http.get<any>("http://localhost:3000/ticketManager/visionsBloquante/"+id);
  }

  getVisionMajeuret(id: number){
    return this._http.get<any>("http://localhost:3000/ticketManager/visionsMajeure/"+id);
  }

  getVisionMineure(id: number){
    return this._http.get<any>("http://localhost:3000/ticketManager/visionsMineure/"+id);
  }

  getAllTicketForRelease(id:number){
    return this._http.get<any>("http://localhost:3000/ticketManager/ticketRelease/"+id);
  }

  getTicket(id:number){
    return this._http.get<any>("http://localhost:3000/ticketManager/"+id);
  }

  putTicket(data : any, id : number){
    return this._http.put<any>("http://localhost:3000/ticketManager/"+id, data);
  }

  deleteTicket(id : number){
    return this._http.delete<any>("http://localhost:3000/ticketManager/"+id);
  }


  //Cas De Test Manage

  postCasTest(data : any){
    return this._http.post<any>("http://localhost:3000/casTestManager", data);
  }

  getAllCasTest(){
    return this._http.get<any>("http://localhost:3000/casTestManager");
  }

  getCasTest(id : number){
    return this._http.get<any>("http://localhost:3000/casTestManager/"+id);
  }

  putCasTest(data : any, id : number){
    return this._http.put<any>("http://localhost:3000/casTestManager/"+id, data);
  }

  deleteCasTest(id : number){
    return this._http.delete<any>("http://localhost:3000/casTestManager/"+id);
  }

  getVisionCasTest(id: number){
    return this._http.get<any>("http://localhost:3000/casTestManager/visionCasTest/"+id);
  }


  //Scenario de test Manage

  postScenario(data : any){
    return this._http.post<any>("http://localhost:3000/scenarioManager", data);
  }

  getAllScenario(){
    return this._http.get<any>("http://localhost:3000/scenarioManager");
  }

  getAllScenarioForCasTest(id: number){
    return this._http.get<any>("http://localhost:3000/scenarioManager/casTest/"+id);
  }

  putScenario(data : any, id : number){
    return this._http.put<any>("http://localhost:3000/scenarioManager/"+id, data);
  }

  deleteScenario(id : number){
    return this._http.delete<any>("http://localhost:3000/scenarioManager/"+id);
  }
}
