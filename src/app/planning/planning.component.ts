import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { DateRange, IgxDateRangePickerComponent, OverlaySettings } from 'igniteui-angular';
import {Planning} from '../models/planning-model';
import {AppSessionService, SessionService} from '../services';
import {EMPTY, Subscription} from 'rxjs';
import Swal from 'sweetalert2';
import {catchError, map} from 'rxjs/operators';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.css']
})
export class PlanningComponent implements OnInit, OnDestroy {
  show_tab_1 = false
  show_tab_2 = false
  @ViewChild('rangePicker')
  public dateRangePicker: IgxDateRangePickerComponent;
  planningSubscription: Subscription;
  plannings: Planning[] = [];
  planning: Planning
  planning_name: string
  public transactionData = {
    headerRow: ['Période', 'Titre', 'Options'],
    dataRows: []
  };
  public range: DateRange = {
    start: new Date(),
    end: new Date(new Date().setDate(new Date().getDate() + 2))
  };
  public rangeSearch: DateRange
  public overlaySettings: OverlaySettings = {
    outlet: this.element,
    modal: true
  };

  constructor(private element: ElementRef, private api_service: SessionService, private app_service: AppSessionService) { }

  ngOnInit(): void {
    this.planningSubscription = this.getPlannings()
  }

  getPlannings() {
    return this.app_service.getPlannings().subscribe((plannings: Planning[]) => {
      this.plannings = plannings;
      this.transactionData.dataRows = plannings;
    });
  }

  public selectDays(count: number) {
    const today: Date = new Date();
    this.range = {
      start: new Date(new Date().setDate(today.getDate() - count + 1)),
      end: today
    };
  }

  public searchPlanning() {
    if (this.rangeSearch === null) {
      this.transactionData.dataRows = this.plannings
    }
    this.transactionData.dataRows = this.plannings.filter( planning => {
      const from = this.rangeSearch.start.getTime()
      const to = this.rangeSearch.end.getTime()
      return (new Date(planning.start_date).getTime() >= from && new Date(planning.start_date).getTime() <= to)
          || (new Date(planning.end_date).getTime() >= from && new Date(planning.end_date).getTime() <= to);

    });
  }

  public savePlanning() {
    this.planning = new Planning()
    this.planning.planning_name = this.planning_name
    this.planning.start_date = this.range.start
    this.planning.end_date = this.range.end
    this.app_service.savePlanning(this.planning).pipe(
        map(res => {
          Swal.fire({
            icon: 'success',
            title: 'Planning enregistré avec succès.',
            showConfirmButton: false,
            timer: 1500
          }).then();
          this.closeTab1();
        }),
        catchError((err, caught) => {
          const message = 'Erreur serveur';
          Swal.fire(
              'Oups!',
              message,
              'error'
          ).then();
          return EMPTY;
        })
    ).subscribe(x => {
      this.getPlannings()
    });
  }

  planning_form_valid() {
    return this.range.start === null || this.planning_name === '' || this.planning_name === undefined
  }

  deletePlanning(id) {
    Swal.fire({
      title: 'Voulez-vous vraiment supprimer le planning ?',
      text: 'Le planning sera définitivement supprimé!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer!'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
            'Supprimé!',
            'Le planning a été supprimé avec succès.',
            'success'
        );
        this.app_service.deletePlanning(id).subscribe(x => {
          this.getPlannings()
        });
      }
    });
  }

  showTab1() {
    this.show_tab_1 = true;
    this.show_tab_2 = false;
  }

  showTab2() {
    this.show_tab_2 = true;
    this.show_tab_1 = false;
  }

  closeTab1() {
    this.show_tab_1 = false;
  }

  closeTab2() {
    this.show_tab_2 = false;
  }

  clearForm() {
    this.rangeSearch = null
    this.searchPlanning()
  }

  ngOnDestroy(): void {
    if (this.planningSubscription) {
      this.planningSubscription.unsubscribe();
    }
  }

}
