import { Component, OnInit, ViewChild } from '@angular/core';
import { AppSessionService } from '../services/app-session.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DialogEditComponent } from './dialog/dialog-edit/dialog-edit.component';
import { PerimetreDialogComponent } from './dialog/perimetre-dialog/perimetre-dialog.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perimetre',
  templateUrl: './perimetre.component.html',
  styleUrls: ['./perimetre.component.css']
})
export class PerimetreComponent implements OnInit {
  displayedColumns: string[] = ['refRelease','nomRelease', 'dateLivraison', 'datePrevision','dateReelle', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private app_service: AppSessionService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllPerimetre();
  }

  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getAllPerimetre(){
    this.app_service.getAllRelease()
    .subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:(_err)=>{
        alert("Impossible de récupérer la liste des releases!!!");
      }
    });
  }

  deleteRelease(refRelease: number) {
    Swal.fire({
      title: 'Voulez-vous vraiment supprimer cette release ?',
      text: 'La release sera définitivement supprimée !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer !'
    }).then((result) => {
      if (result.value) {
        this.app_service.deleteRelease(refRelease)
          .subscribe({
            next: (value) => {
              Swal.fire({
                title: 'Supprimée !',
                text: 'La release a été supprimée avec succès.',
                icon: 'success'
              });
              this.getAllPerimetre();
            },
            error: (err) => {
              Swal.fire({
                title: 'Oups !',
                text: 'Impossible de supprimer cette release.',
                icon: 'error'
              });
            },
          });
      }
    });
  }

  editDialog(row: any) {
    this.dialog.open(DialogEditComponent, {
      width: '50%',
      data: row
    }).afterClosed().subscribe(()=>{
      this.getAllPerimetre();
    });
  }

  openDialogManager(){ 
    this.dialog.open(PerimetreDialogComponent, {
      width: '60%'
    }).afterClosed().subscribe(()=>{
      this.getAllPerimetre();
    });
  }
}
