import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from '../../../testeur/dialog/dialog/dialog.component';
import { AppSessionService } from '../../../services/app-session.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialog-edit',
  templateUrl: './dialog-edit.component.html',
  styleUrls: ['./dialog-edit.component.css']
})
export class DialogEditComponent implements OnInit {

  FormGroup1 = this._formBuilder.group({
    nomRelease:['', Validators.required],
    dateLivraison: [null],
    datePrevision: [null],
    dateReelle: [null]
  });
  

  constructor(@Inject(MAT_DIALOG_DATA) public editData : any, 
  private dialogRef : MatDialogRef<DialogComponent>,
  private _formBuilder: FormBuilder,
  private app_service: AppSessionService,) { }

  ngOnInit(): void {
    if(this.editData){
      this.FormGroup1.controls['nomRelease'].setValue(this.editData.nomRelease);
      this.FormGroup1.controls['dateLivraison'].setValue(this.editData.dateLivraison);
      this.FormGroup1.controls['datePrevision'].setValue(this.editData.datePrevision);
      this.FormGroup1.controls['dateReelle'].setValue(this.editData.dateReelle);
    }
  }



  
  updateRelease(): void {
    this.app_service.putRelease(this.FormGroup1.value, this.editData.refRelease)
      .subscribe({
        next: (res) => {
          Swal.fire({
            title: 'Modifié !',
            text: 'La release a été modifiée avec succès.',
            icon: 'success'
          });
          this.FormGroup1.reset();
          this.dialogRef.close('update');
        },
        error: () => {
          Swal.fire({
            title: 'Oups !',
            text: 'Impossible de modifier cette release.',
            icon: 'error'
          });
        }
      });
  }
  

}
