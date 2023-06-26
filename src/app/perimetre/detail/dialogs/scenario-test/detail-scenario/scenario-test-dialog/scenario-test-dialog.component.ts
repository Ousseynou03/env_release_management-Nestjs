import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { AppSessionService } from '../../../../../../services/app-session.service';
import { DetailScenarioDialogComponent } from '../detail-scenario-dialog/detail-scenario-dialog.component';

@Component({
  selector: 'app-scenario-test-dialog',
  templateUrl: './scenario-test-dialog.component.html',
  styleUrls: ['./scenario-test-dialog.component.css']
})
export class ScenarioTestDialogComponent implements OnInit {

  refCasTest!: number;
  resultat: any;

  displayedColumns: string[] = ['refScenario', 'scenario', 'resultat','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(
    private app_service: AppSessionService,
    public dialog: MatDialog,  
    protected activatedRoute: ActivatedRoute,) { }

    ngOnInit(): void {
      this.activatedRoute.data.subscribe(() => {
        this.refCasTest = Number(this.activatedRoute.snapshot.paramMap.get('id'));
        this.resultat = this.activatedRoute.snapshot.paramMap.get('resultat');
      });
  
      if(this.refCasTest){
        this.getAllScenario(this.refCasTest);
      }
      else{
  
      }
    }
    getAllScenario(id: number) {
      this.app_service.getAllScenarioForCasTest(id)
      .subscribe({
        next:(res) =>{
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },error(err) {
            alert("Impossible de recuperer les donnée")
        },
      })
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
  
    deleteScenario(id : number):void{
      this.app_service.deleteScenario(id)
      .subscribe({
        next:(value) =>{
            alert("Scénario supprimer avec succèss!!!");
            this.getAllScenario(this.refCasTest);
        },error:(err) =>{
            this.getAllScenario(this.refCasTest);
        },
      })
    }
  
    openDialog() {
      this.dialog.open(DetailScenarioDialogComponent, {
        width: '50%'
      }).afterClosed().subscribe(val=>{
        if(val === 'save'){
          this.getAllScenario(this.refCasTest);
        }
      });
    }
  
    editDialog(row : any) {
          this.dialog.open(DetailScenarioDialogComponent, {
            width: '50%',
            data: row
          }).afterClosed().subscribe(val=>{
            if(val === 'update'){
              this.getAllScenario(this.refCasTest);
            }
          });
        }
}
