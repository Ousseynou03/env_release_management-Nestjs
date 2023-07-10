import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { AppSessionService } from '../../../../../services/app-session.service';
import { ITesteur } from '../../../../../manager/manager.model';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-manager-dialog',
  templateUrl: './manager-dialog.component.html',
  styleUrls: ['./manager-dialog.component.css']
})
export class ManagerDialogComponent implements OnInit {

  [x: string]: any;

  items!: MenuItem[];

  listTesteur!: ITesteur[];

  testeur: any;

  casTest: any;

  anomalie: any;
    
  subscription!: Subscription;

  FormGroup2!:FormGroup;

  FormGroup3!:FormGroup;

  FormGroup5!:FormGroup;

  
  
  FormGroup6 = this._formBuilder.group({
    resultat: [null],
    scenario: [null]
  });
  
  isLinear = false;

  constructor(
    private app_service: AppSessionService,
    private _formBuilder: FormBuilder,
    public fb: FormBuilder,
    public router : Router, private route: ActivatedRoute, @Inject(MAT_DIALOG_DATA) public editData : any,  
    private dialogRef : MatDialogRef<ManagerDialogComponent>) { }


  ngOnInit(): void {
    this.FormGroup2 = this._formBuilder.group({
      titre: [null, Validators.required],
      type: [null, Validators.required],
      testeur: new FormControl(null),
      release: [],
      anomalies: [],
      casDeTest: []
      
    });
  
    this.FormGroup3 = this._formBuilder.group({
      resultat: [null]
    });
  
    
    this.FormGroup5 = this._formBuilder.group({
      cloturee: [null],
      criticite: [null],
      enCours: [null],
      priorite: [null],
      statut: [null],
    });

    this.isLinear = true;
    this.app_service.getAllTesteur()
      .subscribe(response => {
        this.listTesteur = response;
      });
    if (this.editData.idC!==null) {
      this.app_service.getCasTest(Number(this.editData.idC))
      .subscribe({
        next:(value) =>{
            this.casTest=value;
            this.FormGroup3.controls['resultat'].setValue(this.casTest['resultat']);
        },
      })
    }
    
    if(this.editData.idA!==null){
      this.app_service.getAnomalie(Number(this.editData.idA))
      .subscribe({
        next:(value) =>{
            this.anomalie=value;
            this.FormGroup5.controls['cloturee'].setValue(this.anomalie['cloturee']);
            this.FormGroup5.controls['criticite'].setValue(this.anomalie['criticite']);
            this.FormGroup5.controls['enCours'].setValue(this.anomalie['enCours']);
            this.FormGroup5.controls['priorite'].setValue(this.anomalie['priorite']);
            this.FormGroup5.controls['statut'].setValue(this.anomalie['statut']);
        },
      })
    }
    

      if(this.editData){
        this.FormGroup2.controls['titre'].setValue(this.editData.row.titre);
        this.FormGroup2.controls['type'].setValue(this.editData.row.type);
      }
      this.app_service.getAllTesteur()
      .subscribe({
        next:(value) =>{
            this.listTesteur=value;
        },
      })
  }


updatePerimetreManager() {
  if (
    this.FormGroup2.value.titre !== null &&
    this.FormGroup2.value.type !== null &&
    this.FormGroup2.value.testeur !== null
  ) {
    if (this.FormGroup3.value.resultat !== null) {
      if (
        this.FormGroup5.value.cloturee !== null ||
        this.FormGroup5.value.criticite !== null ||
        this.FormGroup5.value.enCours !== null ||
        this.FormGroup5.value.priorite !== null ||
        this.FormGroup5.value.statut !== null
      ) {
        this.app_service.putCasTest(this.FormGroup3.value, this.editData.idC).subscribe({
          next: (value1) => {
            this.app_service.putAnomalie(this.FormGroup5.value, this.editData.idA).subscribe({
              next: (value2) => {
                this.app_service.getRelease(Number(this.editData.idR)).subscribe({
                  next: (value) => {
                    this.FormGroup2.value.release = value;
                    this.FormGroup2.value.casDeTest = value1;
                    this.FormGroup2.value.anomalies = value2;
                    this.app_service.putTicket(this.FormGroup2.value, this.editData.row.refTicket).subscribe({
                      next: (value) => {
                        Swal.fire({
                          icon: 'success',
                          title: 'Ticket modifié avec succès!',
                          showConfirmButton: false,
                          timer: 1500
                        }).then();
                        this.dialogRef.close();
                      }
                    });
                  }
                });
              }
            });
          }
        });
      } else {
        this.app_service.putCasTest(this.FormGroup3.value, this.editData.idC).subscribe({
          next: (value1) => {
            this.app_service.getRelease(Number(this.editData.idR)).subscribe({
              next: (value) => {
                this.FormGroup2.value.release = value;
                this.FormGroup2.value.casDeTest = value1;
                this.app_service.putTicket(this.FormGroup2.value, this.editData.row.refTicket).subscribe({
                  next: (value) => {
                    Swal.fire({
                      icon: 'success',
                      title: 'Ticket modifié avec succès!',
                      showConfirmButton: false,
                      timer: 1500
                    }).then();
                    this.dialogRef.close();
                  }
                });
              }
            });
          }
        });
      }
    } else if (
      this.FormGroup5.value.cloturee !== null ||
      this.FormGroup5.value.criticite !== null ||
      this.FormGroup5.value.enCours !== null ||
      this.FormGroup5.value.priorite !== null ||
      this.FormGroup5.value.statut !== null
    ) {
      this.app_service.putAnomalie(this.FormGroup5.value, this.editData.idA).subscribe({
        next: (value1) => {
          this.app_service.getRelease(Number(this.editData.idR)).subscribe({
            next: (value2) => {
              this.FormGroup2.value.release = value2;
              this.FormGroup2.value.anomalies = value1;
              this.app_service.putTicket(this.FormGroup2.value, this.editData.row.refTicket).subscribe({
                next: (value) => {
                  Swal.fire({
                    icon: 'success',
                    title: 'Ticket modifié avec succès!',
                    showConfirmButton: false,
                    timer: 1500
                  }).then();
                  this.dialogRef.close();
                }
              });
            }
          });
        }
      });
    } else if (
      this.FormGroup5.value.cloturee !== null &&
      this.FormGroup5.value.criticite !== null &&
      this.FormGroup5.value.enCours !== null &&
      this.FormGroup5.value.priorite !== null &&
      this.FormGroup5.value.statut !== null &&
      this.FormGroup3.value.resultat !== null
    ) {
      this.app_service.getRelease(Number(this.editData.idR)).subscribe({
        next: (value) => {
          this.FormGroup2.value.release = value;
          this.app_service.putTicket(this.FormGroup2.value, this.editData.row.refTicket).subscribe({
            next: (value) => {
              Swal.fire({
                icon: 'success',
                title: 'Ticket modifié avec succès!',
                showConfirmButton: false,
                timer: 1500
              }).then();
              this.dialogRef.close();
            }
          });
        }
      });
    } else {
      this.app_service.getRelease(Number(this.editData.idR)).subscribe({
        next: (value) => {
          this.FormGroup2.value.release = value;
          this.app_service.putTicket(this.FormGroup2.value, this.editData.row.refTicket).subscribe({
            next: (value) => {
              Swal.fire({
                icon: 'success',
                title: 'Ticket modifié avec succès!',
                showConfirmButton: false,
                timer: 1500
              }).then();
              this.dialogRef.close();
              if (this.editData.idA !== null) {
                this.app_service.deleteAnomalie(Number(this.editData.idA)).subscribe({
                  next: (value) => {
                    Swal.fire('Succès!', 'Anomalie modifiée avec succès.', 'success').then();
                  }
                });
              }
            }
          });
        }
      });
    }
  } else {
    Swal.fire('Oups!', 'Veuillez remplir tous les champs du ticket.', 'error').then();
  }
}

}
