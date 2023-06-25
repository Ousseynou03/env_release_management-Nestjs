import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AppSessionService } from '../../../services/app-session.service';

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

  constructor(private app_service: AppSessionService,) { }

  ngOnInit(): void {
  }

}
