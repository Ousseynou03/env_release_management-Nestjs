import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {LbdModule} from '../../lbd/lbd.module';
import {NguiMapModule} from '@ngui/map';

import {AdminLayoutRoutes} from './admin-layout.routing';

import {HomeComponent} from '../../home/home.component';
import {KeyvaluePipe} from '../../pipes/keyvalue.pipe';

import {ColumnManagerPipe} from '../../pipes/column-manager.pipe';
import {PendingRequestsPipe} from '../../pipes/pending-requests.pipe';
import {ReleasesComponent} from '../../releases/releases.component';
import {EnvironmentsComponent} from '../../environments/environments.component';
import {EnvironmentDetailComponent} from '../../environment-detail/environment-detail.component';
import {PlanningComponent} from '../../planning/planning.component';
import {RoadmapsComponent} from '../../roadmaps/roadmaps.component';
import {IgxDateRangePickerModule} from 'igniteui-angular';
import {PlanningDetailComponent} from '../../planning-detail/planning-detail.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ModalComponent} from '../../modal/modal.component';
import {EnCoursPipe} from '../../pipes/en-cours.pipe';
import {FormatArrayPipe} from '../../pipes/format-array.pipe';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AdminLayoutRoutes),
        FormsModule,
        LbdModule,
        ReactiveFormsModule,
        IgxDateRangePickerModule,
        NgbModule,
        NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=YOUR_KEY_HERE'})
    ],
    exports: [
        KeyvaluePipe, ColumnManagerPipe, EnCoursPipe, EnCoursPipe, FormatArrayPipe
    ],
    declarations: [
        HomeComponent,
        ReleasesComponent,
        EnvironmentsComponent,
        EnvironmentDetailComponent,
        PlanningComponent,
        RoadmapsComponent,
        PlanningDetailComponent,
        ModalComponent,
        KeyvaluePipe,
        ColumnManagerPipe,
        PendingRequestsPipe,
        EnCoursPipe,
        FormatArrayPipe
    ]
})

export class AdminLayoutModule {
}
