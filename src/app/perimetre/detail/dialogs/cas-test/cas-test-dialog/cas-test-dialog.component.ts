import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { TicketDialogComponent } from '../../ticket/ticket-dialog/ticket-dialog.component';
import { AppSessionService } from '../../../../../services/app-session.service';
import { ITicket } from '../../../../../manager/manager.model';

@Component({
  selector: 'app-cas-test-dialog',
  templateUrl: './cas-test-dialog.component.html',
  styleUrls: ['./cas-test-dialog.component.css']
})
export class CasTestDialogComponent implements OnInit {

  listTicket!: ITicket[];

  FormGroup3 = this._formBuilder.group({
    titre: [null, Validators.required],
    type: [null, Validators.required],
    testeur: [],
    release: [],
    anomalies:[],
    casDeTest:[]
  });
  
  FormGroup2 = this._formBuilder.group({
    scenario: [null, Validators.required],
    casTest: []

  });

  FormGroup1 = this._formBuilder.group({
    resultat: [null, Validators.required]
  });

  FormGroup6 = this._formBuilder.group({
    resultat: [null, Validators.required],
    scenario: [null, Validators.required],
    ticket: new FormControl(null)
  });

  refRelease!: number;

  currentStepIndex = 0;

  constructor(
    private app_service: AppSessionService,
    private _formBuilder: FormBuilder,
    public dialog: MatDialog, 
    private dialogRef : MatDialogRef<TicketDialogComponent>,@Inject(MAT_DIALOG_DATA) public data:any
  ) { }

  ngOnInit(): void {
    this.app_service.getAllTicketForRelease(Number(this.data?.id))
    .subscribe(response =>{
      this.listTicket = response;
    })
  }

  addCasDeTest():void{
    if (this.FormGroup6.value.resultat!==null && this.FormGroup6.value.ticket!==null) {
      if (this.FormGroup6.value.scenario!==null) {
        
      } else {
        this.FormGroup1.value.resultat=this.FormGroup6.value.resultat;
        this.app_service.postCasTest(this.FormGroup1.value)
        .subscribe({
          next:(value1) =>{
            this.app_service.getTicket(Number(this.FormGroup6.value.ticket))
            .subscribe({
             next:(value) =>{
                 this.FormGroup3.value.titre=value["titre"];
                 this.FormGroup3.value.type=value["type"];
                 this.FormGroup3.value.testeur=value["testeur"];
                 this.FormGroup3.value.release=value["release"];
                 this.FormGroup3.value.casDeTest=value1
                 this.FormGroup3.value.anomalies=value["anomalies"];
                 this.app_service.putTicket(this.FormGroup3.value, value["refTicket"])
                 .subscribe({
                   next:(res)=>{
                     alert("Cas de Test ajouter avec Succes");
                     this.dialogRef.close();
                   },
                   error:()=>{
                     this.app_service.deleteCasTest(value1["refCasTest"])
                      .subscribe({
                        next:(value) =>{
                          alert("Impossible d'ajouter le Cas de Test");
                          this.dialogRef.close();
                        },
                      })
                   }
                 })
             },
            })
          },error:(err) =>{
              alert("Impossible d'envoyer les données. veuillez réassayer ultérieurment.")
          },
        })

      }
      
    }
  }
  prevStep() {
    this.currentStepIndex--;
  }

  nextStep() {
    if (this.currentStepIndex < this.totalSteps() - 1) {
      this.currentStepIndex++;
    } else {
      this.addCasDeTest();
    }
  }

  totalSteps() {
    return 1; // Mettez le nombre total d'étapes ici
  }
}
