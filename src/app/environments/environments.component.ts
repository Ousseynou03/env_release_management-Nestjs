import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import * as envs from '../models/environments-data';
import {AppSessionService, SessionService} from '../services';
import {EMPTY, Subscription} from 'rxjs';
import Swal from 'sweetalert2';
import {Indisponibilite} from '../models/indisponibilite-model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DateRange, IgxDateRangePickerComponent, OverlaySettings} from 'igniteui-angular';
import {Activity} from '../models/activity-model';
import {catchError, map} from 'rxjs/operators';

@Component({
  selector: 'app-environments',
  templateUrl: './environments.component.html',
  styleUrls: ['./environments.component.css']
})
export class EnvironmentsComponent implements OnInit, OnDestroy {

  show_tab_1 = false
  show_tab_2 = false
  show_section_1 = true
  show_section_2 = false
  show_section_3 = false
  public environmentsData = {
    headerRow: ['Environnements', 'Options'],
    dataRows: [] = envs.arrayData
  };
  indSubscription: Subscription;
  inds: Indisponibilite[] = [];
  ind: Indisponibilite
  public indsData = {
    headerRow: [],
    dataRows: []
  };
  ind_form: FormGroup;
  searchObject: FormGroup;
  formData: any[] = [];
  searchFormData: any[] = [];

  show_tab_3 = false
  show_tab_4 = false
  @ViewChild('rangePicker')
  public dateRangePicker: IgxDateRangePickerComponent;
  activitySubscription: Subscription;
  activities: Activity[] = [];
  activity: Activity
  activity_desc: string
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

  constructor(private api_service: SessionService, private element: ElementRef, private app_service: AppSessionService) { }

  ngOnInit(): void {
    this.formData = this.setFormData();
    this.searchFormData = this.setFormData(true)
    this.indSubscription = this.getInds()
    this.activitySubscription = this.getActivities()
    this.buildIndForm()
    this.buildSearchForm()
  }

  getActivities() {
    return this.app_service.getActivities().subscribe((activities: Activity[]) => {
      this.activities = activities;
      this.transactionData.dataRows = activities;
    });
  }

  getInds() {
    return this.app_service.getInds().subscribe((inds: Indisponibilite[]) => {
      this.inds = inds;
      this.indsData.headerRow = Object.getOwnPropertyNames(new Indisponibilite()).filter( property => {
        return  ['id', 'date_creation'].includes(property) === false;
      });
      this.indsData.dataRows = inds;
    });
  }

  setFormData(filter = false) {
    const formData: any[] = [];
    const instance = new Indisponibilite()
    let attributes = Object.getOwnPropertyNames(instance).filter(property => {
      return  ['id', 'class_id', 'date_creation'].includes(property) === false;
    });
    if (filter) {
      const filterProperty = instance.get_filter_property();
      attributes = attributes.filter( property => {
        return filterProperty.includes(property);
      });
    }
    attributes.forEach( key => {
      if (instance.is_enum(key)) {
        formData.push({'label': key, 'type': typeof instance[key], 'isEnum': true, 'enum': Object.values(instance.get_enum(key))});
      } else if (instance.is_date(instance[key])) {
        formData.push({'label': key, 'type': 'date', 'isEnum': false});
      } else {
        formData.push({'label': key, 'type': typeof instance[key], 'isEnum': false});
      }
    });
    return formData;
  }

  buildIndForm(): void {
    const form = {};
    for (let i = 0; i < this.formData.length; i++) {
      form[this.formData[i].label] = new FormControl('', Validators.required)
    }
    this.ind_form = new FormGroup(form);
  }

  buildSearchForm(): void {
    const form = {};
    for (let i = 0; i < this.searchFormData.length; i++) {
      form[this.searchFormData[i].label] = new FormControl('')
    }
    this.searchObject = new FormGroup(form);
  }

  search(searchObject) {
    const instance = new Indisponibilite()
    const filterProperty = instance.get_filter_property();
    this.indsData.dataRows = this.inds.filter( env => {
      let verify = false
      for (let i = 0; i < filterProperty.length; i++) {
        verify = (env[filterProperty[i]] === searchObject[filterProperty[i]]);
        if (verify) {
          return true
        }
      }
      return verify;
    });
  }


  public saveInd(formValue) {
    this.ind = new Indisponibilite()
    Object.keys(formValue).forEach( key => {
      this.ind[key] = formValue[key];
    });
    this.app_service.saveInd(this.ind).pipe(
        map(() => {
          Swal.fire({
            icon: 'success',
            title: 'Indisponibilité enregistrée avec succès.',
            showConfirmButton: false,
            timer: 1500
          }).then();
          this.closeTab1();
        }),
        catchError(() => {
          const message = 'Erreur serveur';
          Swal.fire(
              'Oups!',
              message,
              'error'
          ).then();
          return EMPTY;
        })
    ).subscribe(() => {
      this.getInds()
    });
  }

  deleteInd(id) {
    Swal.fire({
      title: 'Voulez-vous vraiment supprimer cette ligne ?',
      text: 'La ligne sera définitivement supprimé!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer!'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
            'Supprimé!',
            'La ligne a été supprimé avec succès.',
            'success'
        );
        this.app_service.deleteInd(id).subscribe(() => {
          this.getInds()
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

  showSection1() {
    this.show_section_1 = true;
    this.show_section_2 = false;
    this.show_section_3 = false;
  }

  showSection2() {
    this.show_section_2 = true;
    this.show_section_1 = false;
    this.show_section_3 = false;
  }

  showSection3() {
    this.show_section_3 = true;
    this.show_section_1 = false;
    this.show_section_2 = false;
  }

  closeTab1() {
    this.show_tab_1 = false;
  }

  closeTab2() {
    this.show_tab_2 = false;
  }

  clearForm() {
    this.searchObject.reset();
    this.api_service.emitIndisponibilites()
  }



  public selectDays(count: number) {
    const today: Date = new Date();
    this.range = {
      start: new Date(new Date().setDate(today.getDate() - count + 1)),
      end: today
    };
  }

  public searchActivity() {
    if (this.rangeSearch === null) {
      this.transactionData.dataRows = this.activities
    }
    this.transactionData.dataRows = this.activities.filter( activity => {
      const from = this.rangeSearch.start.getTime()
      const to = this.rangeSearch.end.getTime()
      return (new Date(activity.start_date).getTime() >= from && new Date(activity.start_date).getTime() <= to)
          || (new Date(activity.end_date).getTime() >= from && new Date(activity.end_date).getTime() <= to);

    });
  }

  public saveActivity() {
    this.activity = new Activity()
    this.activity.description = this.activity_desc
    this.activity.start_date = this.range.start
    this.activity.end_date = this.range.end

    this.app_service.saveActivity(this.activity).pipe(
        map(() => {
          Swal.fire({
            icon: 'success',
            title: 'Activité enregistrée avec succès.',
            showConfirmButton: false,
            timer: 1500
          }).then();
          this.closeTab3();
        }),
        catchError(() => {
          const message = 'Erreur serveur';
          Swal.fire(
              'Oups!',
              message,
              'error'
          ).then();
          return EMPTY;
        })
    ).subscribe(() => {
      this.getActivities()
    });
  }

  activity_form_valid() {
    return this.range.start === null || this.activity_desc === '' || this.activity_desc === undefined
  }

  deleteActivity(id) {
    Swal.fire({
      title: 'Voulez-vous vraiment supprimer cette activité ?',
      text: 'Cette activité sera définitivement supprimée!',
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
        this.app_service.deleteActivity(id).subscribe(() => {
          this.getActivities()
        });
      }
    });
  }

  showTab3() {
    this.show_tab_3 = true;
    this.show_tab_4 = false;
  }

  showTab4() {
    this.show_tab_4 = true;
    this.show_tab_3 = false;
  }

  closeTab3() {
    this.show_tab_3 = false;
  }

  closeTab4() {
    this.show_tab_4 = false;
  }

  clearRangePicker() {
    this.rangeSearch = null
    this.searchActivity()
  }

  ngOnDestroy(): void {
    if (this.indSubscription) {
      this.indSubscription.unsubscribe();
    }
    if (this.activitySubscription) {
      this.activitySubscription.unsubscribe();
    }
  }

}
