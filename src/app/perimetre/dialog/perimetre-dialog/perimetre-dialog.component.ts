import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { AppSessionService } from '../../../services/app-session.service';
import { ITesteur } from '../../../manager/manager.model';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-perimetre-dialog',
  templateUrl: './perimetre-dialog.component.html',
  styleUrls: ['./perimetre-dialog.component.css']
})
export class PerimetreDialogComponent implements OnInit {

  [x: string]: any;

  items!: MenuItem[];

  listTesteur!: ITesteur[] ;
    
  subscription!: Subscription;

  
  FormGroup1 = this._formBuilder.group({
    nomRelease:['', Validators.required],
    dateLivraison: [''],
    datePrevision: [''],
    dateReelle: ['']
  });

  FormGroup2 = this._formBuilder.group({
    titre: [null],
    type: [null],
    testeur: new FormControl(null),
    release: [],
    anomalies:[]
  });

  FormGroup3 = this._formBuilder.group({
    resutat: [null],
    ticket: [],
  });

  FormGroup4 = this._formBuilder.group({
    scenario: [null],
    casTest: []

  });
  FormGroup5 = this._formBuilder.group({
    cloturee: [null],
    criticite: [null],
    enCours: [null],
    priorite: [null],
    statut: [null],
  });
  
  FormGroup6 = this._formBuilder.group({
    resutat: [null],
    scenario: [null]
  });
  
  isLinear = false;

  constructor(private app_service: AppSessionService,
    private _formBuilder: FormBuilder,
    public router : Router, private route: ActivatedRoute,  
    private dialogRef : MatDialogRef<PerimetreDialogComponent>,
    public fb: FormBuilder,) { }

  ngOnInit(): void {
    this.isLinear = true;
    this.a.getAllTesteur()
      .subscribe(response => {
        this.listTesteur = response;
      });
  }

  addManager(){
    this.app_service.postRelease(this.FormGroup1.value)
    .subscribe({
      next:(res1)=>{
        if (this.FormGroup2.value.titre!==null || this.FormGroup2.value.type!==null){
          if(this.FormGroup5.value.criticite!==null || this.FormGroup5.value.priorite!==null ||
            this.FormGroup5.value.statut!==null || this.FormGroup5.value.enCours!==null || 
            this.FormGroup5.value.cloturee!==null){
              this.app_service.postAnomalie(this.FormGroup5.value)
                .subscribe({
                  next:(res5)=>{
                    this.FormGroup2.value.anomalies=res5;
                    this.FormGroup2.value.release=res1;
                    this.app_service.postTicket(this.FormGroup2.value)
                    .subscribe({
                      next:(value) =>{
                        this.FormGroup1.reset();
                        this.FormGroup2.reset();
                        this.FormGroup3.reset();
                        this.FormGroup4.reset();
                        this.FormGroup5.reset();
                        this.dialogRef.close();
                      },
                    })
                  },
                  error:()=>{
                      alert("Impossible d'ajouter l' anomalie seule")
                    }
                })
            }else{
              this.FormGroup2.value.release=res1;
              this.ticketService.postTicket(this.FormGroup2.value)
              .subscribe({
                next:(value) =>{
                  this.dialogRef.close();
                },error:(err) =>{
                    alert("Impossible d'envover les donneées du ticket au serveur ");
                },
              })
            }
        }else{
          this.FormGroup1.reset();
          this.FormGroup2.reset();
          this.FormGroup3.reset();
          this.FormGroup4.reset();
          this.FormGroup5.reset();
          this.dialogRef.close();
        }               
      },
      error:()=>{
        alert("Impossible d'ajouter un nouveau release")
      }
    })
  }




}
