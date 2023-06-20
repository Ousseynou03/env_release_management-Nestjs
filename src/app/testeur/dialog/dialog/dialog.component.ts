import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppSessionService } from '../../../services/app-session.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  testeurForm!: FormGroup;
  actionBtn : string = "Envoyer";

  constructor(private formBuilder : FormBuilder, 
    private app_service: AppSessionService,
    @Inject(MAT_DIALOG_DATA) public editData : any, 
    private dialogRef : MatDialogRef<DialogComponent>){}

  ngOnInit(): void {
    this.testeurForm = this.formBuilder.group({
      matricule: [],
      prenom: ['', Validators.required],
      nom: ['', Validators.required],
    });
    if(this.editData){
      this.actionBtn="Modifier";
      this.testeurForm.controls['matricule'].setValue(this.editData.matricule);
      this.testeurForm.controls['prenom'].setValue(this.editData.prenom);
      this.testeurForm.controls['nom'].setValue(this.editData.nom);
    }
  }

  addTesteur(){
    if(!this.editData){
      if(this.testeurForm.valid){
        this.app_service.postTesteur(this.testeurForm.value)
        .subscribe({
          next:(res)=>{
            alert("Testeur ajouter avec succès");
            this.testeurForm.reset();
            this.dialogRef.close('save');
          },
          error:()=>{
            alert("Impossible d'envoyer les données sur le serveur")
          }
        })
      }
    }else{
      this.updateTesteur();
    }
  }

  updateTesteur(){
    this.app_service.putTesteur(this.testeurForm.value, this.editData.idTesteur)
    .subscribe({
      next:(res)=>{
        alert("Testeur Modifier avec Succes");
        this.testeurForm.reset();
        this.dialogRef.close('update');
      },
      error:()=>{
        alert("Impossible de modifier ce testeur");
      }
    })
  }

}
