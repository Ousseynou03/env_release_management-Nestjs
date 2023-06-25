import { Routes } from '@angular/router';

import { HomeComponent } from '../../home/home.component';
import {UserGuardService} from '../../guards/is_user';
import {ReleasesComponent} from '../../releases/releases.component';
import {EnvironmentsComponent} from '../../environments/environments.component';
import {EnvironmentDetailComponent} from '../../environment-detail/environment-detail.component';
import {PlanningComponent} from '../../planning/planning.component';
import {RoadmapsComponent} from '../../roadmaps/roadmaps.component';
import {PlanningDetailComponent} from '../../planning-detail/planning-detail.component';
import { TesteurComponent } from '../../testeur/testeur.component';
import { PerimetreComponent } from '../../perimetre/perimetre.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: HomeComponent },
    { path: 'environments',    component: EnvironmentsComponent, canActivate: [UserGuardService] },
    { path: 'environmentDetail/:id',    component: EnvironmentDetailComponent, canActivate: [UserGuardService] },
    { path: 'planningDetail/:id', component: PlanningDetailComponent, canActivate: [UserGuardService] },
    { path: 'releases',    component: ReleasesComponent, canActivate: [UserGuardService] },
    { path: 'plannings',    component: PlanningComponent, canActivate: [UserGuardService] },
    { path: 'roadmaps',    component: RoadmapsComponent, canActivate: [UserGuardService] },
    { path: 'testeur',    component: TesteurComponent, canActivate: [UserGuardService] },
    { path: 'perimetre',    component: PerimetreComponent, canActivate: [UserGuardService] }

];
