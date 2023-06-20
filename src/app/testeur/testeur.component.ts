import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AppSessionService } from 'app/services/app-session.service';
import { DialogComponent } from './dialog/dialog/dialog.component';


@Component({
  selector: 'app-testeur',
  templateUrl: './testeur.component.html',
  styleUrls: ['./testeur.component.css']
})
export class TesteurComponent implements OnInit {
  title = 'Liste Des Testeurs'
  displayedColumns: string[] = ['idTesteur', 'matricule', 'prenom', 'nom', 'action'];
  dataSource!: MatTableDataSource<any>;


  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(public dialog: MatDialog, private app_service: AppSessionService) {} 

  ngOnInit(): void {
    this.getAllTesteur()
  }

  ngAfterViewInit() {
    if(this.paginator === undefined){
      this.dataSource.paginator = this.paginator;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '50%'
    }).afterClosed().subscribe(val=>{
      if(val === 'save'){
        this.getAllTesteur();
      }
    });
  }

    editDialog(row : any) {
        this.dialog.open(DialogComponent, {
          width: '50%',
          data: row
        }).afterClosed().subscribe(val=>{
          if(val === 'update'){
            this.getAllTesteur();
          }
        });
      }

  getAllTesteur(){
    this.app_service.getAllTesteur()
    .subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:(_err)=>{
        alert("Impossible de recupere la liste des testeurs!!!")
      }
    })
  }

  deleteTesteur(id: number){
    this.app_service.deleteTesteur(id)
    .subscribe({
      next:(_res)=>{
        alert("Testeur supprimer avec succes");
        this.getAllTesteur();
      },
      error:(error)=>{
        alert("Impossible de supprimer ce testeur");
        this.getAllTesteur();
      }
    })
  }
}

