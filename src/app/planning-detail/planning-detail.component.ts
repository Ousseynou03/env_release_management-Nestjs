import {Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Planning} from '../models/planning-model';
import {AppSessionService} from '../services';
import {Subscription} from 'rxjs/Subscription';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import {Task} from '../models/task';
import {TaskStatus} from '../models/task-status';
import {ModalComponent} from '../modal/modal.component';
import {ModalConfig} from '../models/modal.config';
import {catchError, map} from 'rxjs/operators';
import {EMPTY} from 'rxjs';

@Component({
  selector: 'app-planning-detail',
  templateUrl: './planning-detail.component.html',
  styleUrls: ['./planning-detail.component.css']
})
export class PlanningDetailComponent implements OnInit, OnDestroy {
  @ViewChildren('modal', { read: ElementRef }) modalComponentsRef: QueryList<ElementRef>;
  @ViewChildren('modal') private modalComponents: QueryList<ModalComponent>;
  private modalComponent: ModalComponent

  show_tab_1 = false
  show_tab_2 = false
  planningId: number
  planning: Planning = new Planning()
  public transactionData = {
    headerRow: ['Titre', 'Status', 'Options'],
    dataRows: []
  };
  plannings: Planning[] = [];
  planningSubscription: Subscription;
  task_form: FormGroup;
  task_update_form: FormGroup;
  tasks: Task[] = [];
  taskSubscription: Subscription;
  searchObject: FormGroup;
  STATUS = Object.values(TaskStatus)
  modalConfig: ModalConfig = {
    'closeButtonLabel': 'Fermer'
  }

  constructor(private route: ActivatedRoute, private app_service: AppSessionService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.planningId = params['id'];
    });
    this.planningSubscription = this.getPlannings()
    this.taskSubscription = this.getTasks()
    this.buildTaskForm();
    this.buildTaskUpdateForm();
    this.buildSearchForm();
  }

  getTasks() {
    return this.app_service.getTasks().subscribe((tasks) => {
      if (tasks.length > 0) {
        this.tasks = tasks.filter( task => {
          return task.planning.id === this.planningId
        });
        this.transactionData.dataRows = this.tasks;
      }
    });
  }

  getPlannings() {
    return this.app_service.getPlannings().subscribe((plannings: Planning[]) => {
      this.plannings = plannings;
    });
  }

  buildTaskForm() {
    this.task_form = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      status: new FormControl('')
    });
  }

  buildTaskUpdateForm() {
    this.task_update_form = new FormGroup({
      id: new FormControl(''),
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      status: new FormControl('')
    });
  }

  buildSearchForm() {
    this.searchObject = new FormGroup({
      title: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
    });
  }

  search(searchObject) {
    const filterProperty = ['title', 'status']
    this.transactionData.dataRows = this.tasks.filter( task => {
      let verify = false
      for (let i = 0; i < filterProperty.length; i++) {
        verify = (task[filterProperty[i]] === searchObject[filterProperty[i]]);
        if (verify) {
          return true
        }
      }
      return verify;
    });
  }

  saveTask(formValue) {
    const task = new Task();
    task.planningId = Number(this.planningId)
    task.title = formValue.title
    task.description = formValue.description
    task.status = TaskStatus.creation
    if (formValue.id) {
      task.id = formValue.id
      task.status = formValue.status
    }
    this.app_service.saveTask(task).pipe(
        map(() => {
          Swal.fire({
            icon: 'success',
            title: 'Tâche enregistrée avec succès.',
            showConfirmButton: false,
            timer: 1500
          }).then();
          this.getTasks()
          this.task_update_form.reset()
          this.task_form.reset()
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
    ).subscribe();
    if (this.modalComponent) {
      this.modalComponent.close().then(r => r)
    }
  }

  deleteTask(id) {
    Swal.fire({
      title: 'Voulez-vous vraiment supprimer la tâche ?',
      text: 'La tâche sera définitivement supprimée!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer!'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
            'Supprimée!',
            'La tâche a été supprimée avec succès.',
            'success'
        );
        this.app_service.deleteTask(id).subscribe(() => {
          this.getTasks()
        });
      }
    });
  }

  async openModal(row, type = true) {
    const index = this.modalComponentsRef.toArray().findIndex( (elt) => {
      if (type) {
        return (elt.nativeElement.id === 'show' + row.id)
      } else {
        return (elt.nativeElement.id === 'update' + row.id);
      }
    })
    this.task_update_form.patchValue({
      id: row.id,
      title: row.title,
      status: row.status,
      description: row.description
    });
    this.modalComponent = this.modalComponents.toArray()[index]
    this.modalConfig.modalTitle = type ? 'Détail Tâche' : 'Modifier Tâche'
    return await this.modalComponent.open()
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
    this.getTasks()
  }


  ngOnDestroy(): void {
    if (this.planningSubscription) {
      this.planningSubscription.unsubscribe();
    }
    if (this.taskSubscription) {
      this.taskSubscription.unsubscribe();
    }
  }


}
