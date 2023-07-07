import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { AppSessionService } from '../../../services/app-session.service';
import { ITesteur } from '../../../manager/manager.model';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

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
  currentStepIndex = 0;



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


  

  addManager() {
    this.app_service.postRelease(this.FormGroup1.value).subscribe({
      next: (res1) => {
        Swal.fire({
          icon: 'success',
          title: 'Release ajoutée avec succès.',
          showConfirmButton: false,
          timer: 1500
        }).then();
        this.dialogRef.close();
      },
      error: () => {
        Swal.fire('Oups!', 'Impossible d\'ajouter une nouvelle release.', 'error').then();
      }
    });
  }
  
  




}
