import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppSessionService } from '../../../../../services/app-session.service';
import { ITesteur } from '../../../../../manager/manager.model';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-ticket-dialog',
  templateUrl: './ticket-dialog.component.html',
  styleUrls: ['./ticket-dialog.component.css']
})
export class TicketDialogComponent implements OnInit {

  FormGroup2 = this._formBuilder.group({
    titre: [null, Validators.required],
    type: [null, Validators.required],
    anomalies:[null, Validators.required],
    casDeTest:[null, Validators.required],
    release: new FormControl(null),
    testeur: new FormControl(null)
  });

  listTesteur!: ITesteur[] ;

  listRelease!: any;
  currentStepIndex = 0;


  constructor(
    private app_service: AppSessionService,
    private _formBuilder: FormBuilder,
    public dialog: MatDialog, 
    private dialogRef : MatDialogRef<TicketDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data:any) { }

    ngOnInit(): void {
      this.app_service.getAllTesteur()
        .subscribe(response => {
          this.listTesteur = response;
        });
  
      this.app_service.getRelease(Number(this.data?.id))
      .subscribe(response =>{
        this.listRelease = response;
      });
    }

    prevStep() {
      this.currentStepIndex--;
    }
  
    nextStep() {
      if (this.currentStepIndex < this.totalSteps() - 1) {
        this.currentStepIndex++;
      } else {
        this.addTicket();
      }
    }
  
    totalSteps() {
      return 1;
    }
    addTicket() {
      if (
        this.FormGroup2.value.titre !== null &&
        this.FormGroup2.value.type !== null &&
        this.FormGroup2.value.testeur !== null &&
        this.FormGroup2.value.release !== null
      ) {
        this.app_service.postTicket(this.FormGroup2.value).subscribe({
          next: (value) => {
            Swal.fire({
              icon: 'success',
              title: 'Ticket ajouté avec succès!',
              showConfirmButton: false,
              timer: 1500
            }).then();
            this.dialogRef.close('save');
          },
          error: (err) => {
            Swal.fire('Erreur!', 'Impossible d\'envoyer les données. Veuillez réessayer ultérieurement!', 'error').then();
          }
        });
      } else {
        Swal.fire('Oups!', 'Veuillez remplir tous les champs du ticket.', 'error').then();
      }
    }

}
