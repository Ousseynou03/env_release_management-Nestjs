import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from '../../../testeur/dialog/dialog/dialog.component';
import { AppSessionService } from '../../../services/app-session.service';

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

  updateRelease(){
    this.app_service.putRelease(this.FormGroup1.value, this.editData.refRelease)
    .subscribe({
      next:(res)=>{
        alert("Release Modifier avec Succes");
        this.FormGroup1.reset();
        this.dialogRef.close('update');
      },
      error:()=>{
        alert("Impossible de modifier ce release");
      }
    })
  }

}
