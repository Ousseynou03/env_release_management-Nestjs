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
      width: '50%',
    }).afterClosed().subscribe(()=>{
      this.getAllTicket(this.id);
      
    });
  }

  ajoutDialogaCasTest(id: number){ 
    this.dialog.open(CasTestDialogComponent, {
      data:{id},
      width: '50%',
    }).afterClosed().subscribe(()=>{
      this.getAllTicket(this.id);
      
    });
  }


  deleteTicket(id: number, idC: number, idA:number){
    if ((idC!==null && idA!==null)) {
      this.app_service.deleteTicket(id)
        .subscribe({
          next:(_res) =>{
            this.app_service.deleteAnomalie(idA)
            .subscribe({
              next:(_value) =>{
                this.app_service.deleteCasTest(idC)
                .subscribe({
                  next:(_value) =>{
                    alert("Ticket, Anomalie, Cas De Test supprimés avec succès!!!");
                    this.getAllTicket(this.id); 
                  },
                })
              },
            })    
          },
        })
        alert("Ticket, Anomalie supprimés avec succès!!!");
        this.getAllTicket(this.id);
      }
      else if((idC!==null && idA===null)){
        this.app_service.deleteTicket(id)
            .subscribe({
              next:(_res) =>{
                this.app_service.deleteCasTest(idC)
                .subscribe({
                  next:(_value) =>{
                  },
                })
              },
            })
            alert("Ticket, Cas De Test supprimés avec succès!!!");
            this.getAllTicket(this.id);
      }
      else if((idC===null && idA!==null)){
        this.app_service.deleteTicket(id)
            .subscribe({
              next:(_res) =>{
                this.app_service.deleteAnomalie(idC)
                .subscribe({
                  next:(_value) =>{
                    
                  },
                })
              },
            })
            alert("Ticket, Anomalies supprimés avec succès!!!");
            this.getAllTicket(this.id);
      }
      else{
        this.app_service.deleteTicket(id)
        .subscribe({
          next:(_res) =>{
              alert("Ticket supprimé avec succès!!!");
              this.getAllTicket(this.id);
          },
          error:()=>{
            this.getAllTicket(this.id);
          }
        })
        alert("Ticket supprimé avec succès!!!");
        this.getAllTicket(this.id);
      }
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

  deleteAnomalie(id: number){
    this.app_service.deleteAnomalie(id)
    .subscribe({
      next:(_res) =>{
          this.getAllAnomalie();
      },
    })
  }
  
}
