import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {EMPTY, Subscription} from 'rxjs';
import {AppSessionService, SessionService} from '../services';
import Swal from 'sweetalert2';
import {ActivatedRoute} from '@angular/router';
import * as envs_data from '../models/environments-data';
import * as env_class from '../models/environment-classes';
import {TYPES} from '../models/environment-classes';
import {catchError, map} from 'rxjs/operators';

@Component({
  selector: 'app-environment-detail',
  templateUrl: './environment-detail.component.html',
  styleUrls: ['./environment-detail.component.css']
})
export class EnvironmentDetailComponent implements OnInit, OnDestroy {
  public transactionData = {
    headerRow: [],
    dataRows: []
  };
  environment_form: FormGroup;
  environment_id: string;
  formData: any[] = [];
  searchFormData: any[] = [];
  env_data = envs_data.arrayData;
  show_tab_1 = false
  show_tab_2 = false
  environments: TYPES[];
  environmentSubscription: Subscription;
  searchObject: FormGroup;


  constructor(private api_service: SessionService, private route: ActivatedRoute, private app_service: AppSessionService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.environment_id = params['id'];
      this.formData = this.setFormData(this.environment_id);
      this.searchFormData = this.setFormData(this.environment_id, true);
    });
    this.environmentSubscription = this.getEnvironment()
    this.buildSearchForm();
    this.buildEnvironmentForm();
  }

  getEnvironment() {
    return this.app_service.getEnvironments(this.environment_id).subscribe(
        (environments: TYPES[]) => {
          if (environments.length > 0) {
            this.environments = environments
            const instance = this.getInstance(this.environment_id)
            this.transactionData.headerRow = Object.getOwnPropertyNames(instance).filter( property => {
              return  ['id', 'class_id', 'date_creation'].includes(property) === false;
            });
            this.transactionData.dataRows = this.environments
          }
        });
  }

  buildEnvironmentForm(): void {
    const form = {};
    for (let i = 0; i < this.formData.length; i++) {
      form[this.formData[i].label] = new FormControl('', Validators.required)
    }
    this.environment_form = new FormGroup(form);
  }

  buildSearchForm(): void {
    const form = {};
    for (let i = 0; i < this.searchFormData.length; i++) {
      form[this.searchFormData[i].label] = new FormControl('')
    }
    this.searchObject = new FormGroup(form);
  }

  search(searchObject) {
    const instance = this.getInstance(this.environment_id)
    const filterProperty = instance.get_filter_property();
    this.transactionData.dataRows = this.environments.filter( env => {
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

  saveEnvironment(formValue) {
    const instance = this.getInstance(this.environment_id);
    Object.keys(formValue).forEach( key => {
      instance[key] = formValue[key];
    });
    instance.class_id = this.environment_id
    this.app_service.saveEnvironment(instance, this.environment_id).pipe(
        map(() => {
          Swal.fire({
            icon: 'success',
            title: 'Environnement enregistré avec succès.',
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
      this.getEnvironment()
    });
  }

  instantiate_current_class(className, id) {
    return new env_class[className](id);
  }

  getInstance(id) {
    const  className = this.env_data.filter( elt => {
      return (elt.id).toString() === id
    })[0].class;
    return this.instantiate_current_class(className, id);
  }

  setFormData(id, filter = false) {
    const formData: any[] = [];
    const instance = this.getInstance(id)
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
    this.searchObject.reset();
    this.api_service.emitEnvironments()
  }

  ngOnDestroy(): void {
    if (this.environmentSubscription) {
      this.environmentSubscription.unsubscribe();
    }
  }


}
