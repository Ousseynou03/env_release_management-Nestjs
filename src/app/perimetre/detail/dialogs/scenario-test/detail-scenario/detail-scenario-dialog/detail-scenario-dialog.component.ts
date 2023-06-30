import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AppSessionService } from '../../../../../../services/app-session.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-detail-scenario-dialog',
  templateUrl: './detail-scenario-dialog.component.html',
  styleUrls: ['./detail-scenario-dialog.component.css']
})
export class DetailScenarioDialogComponent implements OnInit {

  scenarioForm!: FormGroup;
  actionBtn : string = "Envoyer";
  listCasTest: any;


  constructor(
    private app_service: AppSessionService,
    private formBuilder : FormBuilder, 
    @Inject(MAT_DIALOG_DATA) public editData : any, 
    private dialogRef : MatDialogRef<DetailScenarioDialogComponent>,) { }

    ngOnInit(): void {
      this.app_service.getAllCasTest()
      .subscribe({
        next:(value) =>{
            this.listCasTest=value;
        },
      })
      this.scenarioForm = this.formBuilder.group({
        scenario: [null, Validators.required],
        casDeTest: new FormControl(null)
      });
      if(this.editData){
        this.actionBtn="Modifier";
        this.scenarioForm.controls['scenario'].setValue(this.editData.scenario);
        this.scenarioForm.controls['casDeTest'].setValue(this.editData.casDeTest);
      }
    }
  
  
    addScenario(): void {
      if (!this.editData) {
        if (this.scenarioForm.valid) {
          this.app_service.postScenario(this.scenarioForm.value)
            .subscribe({
              next: (res) => {
                Swal.fire({
                  title: 'Ajouté !',
                  text: 'Le scénario a été ajouté avec succès.',
                  icon: 'success'
                });
                this.scenarioForm.reset();
                this.dialogRef.close('save');
              },
              error: () => {
                Swal.fire({
                  title: 'Oups !',
                  text: 'Impossible d\'ajouter un nouveau scénario.',
                  icon: 'error'
                });
              }
            });
        }
      } else {
        this.updateScénario();
      }
    }
    
    updateScénario(): void {
      this.app_service.putScenario(this.scenarioForm.value, this.editData.refScenario)
        .subscribe({
          next: (res) => {
            Swal.fire({
              title: 'Modifié !',
              text: 'Le scénario a été modifié avec succès.',
              icon: 'success'
            });
            this.scenarioForm.reset();
            this.dialogRef.close('update');
          },
          error: () => {
            Swal.fire({
              title: 'Oups !',
              text: 'Impossible de modifier ce scénario.',
              icon: 'error'
            });
          }
        });
    }
    
    

}
