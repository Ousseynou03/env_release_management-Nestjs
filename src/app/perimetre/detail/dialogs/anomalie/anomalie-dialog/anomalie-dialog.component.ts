import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TicketDialogComponent } from '../../ticket/ticket-dialog/ticket-dialog.component';
import { AppSessionService } from '../../../../../services/app-session.service';
import { ITicket } from '../../../../../manager/manager.model';

@Component({
  selector: 'app-anomalie-dialog',
  templateUrl: './anomalie-dialog.component.html',
  styleUrls: ['./anomalie-dialog.component.css']
})
export class AnomalieDialogComponent implements OnInit {

  FormGroup5 = this._formBuilder.group({
    cloturee: [null, Validators.required],
    criticite: [null, Validators.required],
    enCours: [null, Validators.required],
    priorite: [null, Validators.required],
    statut: [null, Validators.required],
    ticket: [null, Validators.required],
  });

  refRelease!: number
  
  FormGroup1 = this._formBuilder.group({
    cloturee: [null, Validators.required],
    criticite: [null, Validators.required],
    enCours: [null, Validators.required],
    priorite: [null, Validators.required],
    statut: [null, Validators.required],
  });

  FormGroup2 = this._formBuilder.group({
    titre: [null, Validators.required],
    type: [null, Validators.required],
    testeur: [],
    release: [],
    anomalies:[],
    casDeTest:[]
  });

  listTicket!: ITicket[] ;

  constructor(private app_service: AppSessionService,
    private _formBuilder: FormBuilder,
    private dialogRef : MatDialogRef<TicketDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data:any
    ) { }

  ngOnInit(): void {
    this.app_service.getAllTicketForRelease(Number(this.data?.id))
    .subscribe(response =>{
      this.listTicket = response;
    })
  }

  addAnomalie(){
    this.FormGroup1.value.cloturee=this.FormGroup5.value.cloturee;
    this.FormGroup1.value.criticite=this.FormGroup5.value.criticite;
    this.FormGroup1.value.enCours=this.FormGroup5.value.enCours;
    this.FormGroup1.value.priorite=this.FormGroup5.value.priorite;
    this.FormGroup1.value.statut=this.FormGroup5.value.statut;
     if (this.FormGroup1.value.cloturee!==null || this.FormGroup1.value.criticite!==null || this.FormGroup1.value.enCours!==null
       || this.FormGroup1.value.priorite!==null || this.FormGroup1.value.statut!==null) {
         this.app_service.postAnomalie(this.FormGroup1.value)
         .subscribe({
           next:(value1)=> {
              this.app_service.getTicket(Number(this.FormGroup5.value.ticket))
              .subscribe({
               next:(value) =>{
                   this.FormGroup2.value.titre=value["titre"];
                   this.FormGroup2.value.type=value["type"];
                   this.FormGroup2.value.testeur=value["testeur"];
                   this.FormGroup2.value.release=value["release"];
                   this.FormGroup2.value.casDeTest=value["casDeTest"];
                   this.FormGroup2.value.anomalies=value1;
                   this.app_service.putTicket(this.FormGroup2.value, value["refTicket"])
                   .subscribe({
                     next:(res)=>{
                       alert("Anomalie ajouter avec Succes");
                       this.dialogRef.close();
                     },
                     error:()=>{
                       alert("Impossible d'ajouter le testeur");
                     }
                   })
               },
              })
           },error:(err) =>{
               alert("Impossible d'envoyer les donner. Veuillez réassayer ultérieurement!!!")
           },
         }) 
     }
   }

}
