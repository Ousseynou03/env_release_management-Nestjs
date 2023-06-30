import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AppSessionService } from '../../../services/app-session.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AnomalieDialogComponent } from '../dialogs/anomalie/anomalie-dialog/anomalie-dialog.component';
import { CasTestDialogComponent } from '../dialogs/cas-test/cas-test-dialog/cas-test-dialog.component';
import { ManagerDialogComponent } from '../dialogs/manager/manager-dialog/manager-dialog.component';
import { TicketDialogComponent } from '../dialogs/ticket/ticket-dialog/ticket-dialog.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail-release',
  templateUrl: './detail-release.component.html',
  styleUrls: ['./detail-release.component.css']
})
export class DetailReleaseComponent implements OnInit {

  id!: number;
  detail: any;
  info: any;

  displayedColumnsTicket: string[] = ['titre', 'type', 'testeur','casTest', 'scenario', 'cloture','criticite','cours','priorite', 'statut', 'action'];
  dataSourceTicket!: MatTableDataSource<any>;

  @ViewChild(MatPaginator, {static: true}) paginatorTicket!: MatPaginator;
  @ViewChild(MatSort) sortTicket!: MatSort;


  displayedColumnsAnomalie: string[] = ['id', 'refAnomalie', 'titreAnomalie', 'criticiteAnomalie','motifAnomalie','statutAnomalie','prioriteAnomalie','action'];
  dataSourceAnomalie!: MatTableDataSource<any>;

  @ViewChild(MatPaginator, {static: true}) paginatorAnomalie!: MatPaginator;
  @ViewChild(MatSort) sortAnomalie!: MatSort;

  constructor(private app_service: AppSessionService,public dialog: MatDialog, protected activatedRoute: ActivatedRoute,
    protected router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(() => {
      this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
      this.info = this.activatedRoute.snapshot.paramMap.get('nomRelase');
    });

    if(this.id){
      this.getAllTicket(this.id);
    }
  }

    // Partie Ticket
    getAllTicket(id:number){
      this.app_service.getAllTicketForRelease(id)
      .subscribe({
        next: (res) =>{
          this.dataSourceTicket = new MatTableDataSource(res);
          this.dataSourceTicket.paginator = this.paginatorTicket;
          this.dataSourceTicket.sort = this.sortTicket; 
        },
      })
    }
  
    ngAfterViewInit() {
      if(this.paginatorTicket === undefined){
        this.dataSourceTicket.paginator = this.paginatorTicket;
      }
    }
  
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSourceTicket.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSourceTicket.paginator) {
        this.dataSourceTicket.paginator.firstPage();
      }
    }

    
    editDialogTicket(row: any, idR:number, idC:number|null, idA: number|null){ 
      this.dialog.open(ManagerDialogComponent, {
        width: '50%',
        data: {row, idR, idC, idA}
      }).afterClosed().subscribe(()=>{
        this.getAllTicket(this.id);
        
      });
    }
  
    ajoutDialogTicket(id: number){ 
    this.dialog.open(TicketDialogComponent,{
      data:{id},
      width: '50%',
    }).afterClosed().subscribe(()=>{
      this.getAllTicket(this.id);
      
    });
  }

  ajoutDialogAnomalie(id: number){ 
    this.dialog.open(AnomalieDialogComponent, {
      data:{id},
      width: '60%',
    }).afterClosed().subscribe(()=>{
      this.getAllTicket(this.id);
      
    });
  }

  ajoutDialogaCasTest(id: number){ 
    this.dialog.open(CasTestDialogComponent, {
      data:{id},
      width: '30%',
    }).afterClosed().subscribe(()=>{
      this.getAllTicket(this.id);
      
    });
  }

 

  // ...
  
  deleteTicket(id: number, idC: number, idA: number) {
    let successMessage = '';
    let errorMessage = '';
  
    if (idC !== null && idA !== null) {
      successMessage = 'Ticket, Anomalie, Cas de Test supprimés avec succès!';
      errorMessage = 'Impossible de supprimer le Ticket, Anomalie, Cas de Test.';
    } else if (idC !== null && idA === null) {
      successMessage = 'Ticket, Cas de Test supprimés avec succès!';
      errorMessage = 'Impossible de supprimer le Ticket et le Cas de Test.';
    } else if (idC === null && idA !== null) {
      successMessage = 'Ticket, Anomalie supprimés avec succès!';
      errorMessage = 'Impossible de supprimer le Ticket et l\'Anomalie.';
    } else {
      successMessage = 'Ticket supprimé avec succès!';
      errorMessage = 'Impossible de supprimer le Ticket.';
    }
  
    Swal.fire({
      title: 'Voulez-vous vraiment supprimer ce ticket ?',
      text: 'Le ticket sera définitivement supprimé !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer !'
    }).then((result) => {
      if (result.value) {
        this.app_service.deleteTicket(id).subscribe({
          next: (_res) => {
            if (idC !== null && idA !== null) {
              this.app_service.deleteAnomalie(idA).subscribe();
              this.app_service.deleteCasTest(idC).subscribe();
            } else if (idC !== null && idA === null) {
              this.app_service.deleteCasTest(idC).subscribe();
            } else if (idC === null && idA !== null) {
              this.app_service.deleteAnomalie(idA).subscribe();
            }
  
            Swal.fire({
              title: 'Supprimé !',
              text: successMessage,
              icon: 'success'
            });
            this.getAllTicket(this.id);
          },
          error: () => {
            Swal.fire({
              title: 'Oups !',
              text: errorMessage,
              icon: 'error'
            });
            this.getAllTicket(this.id);
          }
        });
      }
    });
  }
  

  // Partie Anomalie
  getAllAnomalie(){
    this.app_service.getAllAnomalie()
    .subscribe({
      next: (res) =>{
        this.dataSourceAnomalie = new MatTableDataSource(res);
        this.dataSourceAnomalie.paginator = this.paginatorAnomalie;
        this.dataSourceAnomalie.sort = this.sortAnomalie; 
      },
    })
  }

 
  
  deleteAnomalie(id: number) {
    Swal.fire({
      title: 'Voulez-vous vraiment supprimer cette anomalie ?',
      text: 'L\'anomalie sera définitivement supprimée !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer !'
    }).then((result) => {
      if (result.value) {
        this.app_service.deleteAnomalie(id).subscribe({
          next: (_res) => {
            Swal.fire({
              title: 'Supprimée !',
              text: 'L\'anomalie a été supprimée avec succès.',
              icon: 'success'
            });
            this.getAllAnomalie();
          },
          error: () => {
            Swal.fire({
              title: 'Oups !',
              text: 'Impossible de supprimer cette anomalie.',
              icon: 'error'
            });
            this.getAllAnomalie();
          }
        });
      }
    });
  }
  
  
}
