import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {AppRoutingModule} from './app.routing';
import {NavbarModule} from './shared/navbar/navbar.module';
import {FooterModule} from './shared/footer/footer.module';
import {SidebarModule} from './sidebar/sidebar.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {AppComponent} from './app.component';
import {MatDialogModule} from '@angular/material/dialog';
import {AdminLayoutComponent} from './layouts/admin-layout/admin-layout.component';
import {AuthentificationComponent} from './authentification/authentification.component';
import {AppSessionService, SessionService} from './services';
import {AuthGuardService} from './guards/is_auth';
import {GestionnaireGuardService} from './guards/is_gestionnaire';
import {UserGuardService} from './guards/is_user';
import {AdminGuardService} from './guards/is_admin';
import {AdminLayoutModule} from './layouts/admin-layout/admin-layout.module';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {ModalComponent} from './modal/modal.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AuthInterceptor} from './interceptors/auth.interceptor';
import { TesteurComponent } from './testeur/testeur.component';
import { DialogComponent } from './testeur/dialog/dialog/dialog.component';
import {MatTreeModule} from '@angular/material/tree';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatStepperModule} from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatSelectModule} from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { PerimetreComponent } from './perimetre/perimetre.component';
import { DetailReleaseComponent } from './perimetre/detail/detail-release/detail-release.component';
import { DialogEditComponent } from './perimetre/dialog/dialog-edit/dialog-edit.component';
import { PerimetreDialogComponent } from './perimetre/dialog/perimetre-dialog/perimetre-dialog.component';
import { ManagerComponent } from './manager/manager.component';
import { AnomalieDialogComponent } from './perimetre/detail/dialogs/anomalie/anomalie-dialog/anomalie-dialog.component';
import { CasTestDialogComponent } from './perimetre/detail/dialogs/cas-test/cas-test-dialog/cas-test-dialog.component';
import { ManagerDialogComponent } from './perimetre/detail/dialogs/manager/manager-dialog/manager-dialog.component';
import { DetailScenarioDialogComponent } from './perimetre/detail/dialogs/scenario-test/detail-scenario/detail-scenario-dialog/detail-scenario-dialog.component';
import { ScenarioTestDialogComponent } from './perimetre/detail/dialogs/scenario-test/detail-scenario/scenario-test-dialog/scenario-test-dialog.component';
import { TicketDialogComponent } from './perimetre/detail/dialogs/ticket/ticket-dialog/ticket-dialog.component';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        FormsModule,
        RouterModule,
        HttpClientModule,
        NavbarModule,
        FooterModule,
        SidebarModule,
        AppRoutingModule,
        CommonModule,
        ReactiveFormsModule,
        AdminLayoutModule,
        NgbModule,
        //Material imports
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatTreeModule,
        MatIconModule,
        MatToolbarModule,
        MatListModule,
        MatDividerModule,
        MatMenuModule,
        MatSidenavModule,
        MatStepperModule,
        MatDatepickerModule,
        MatSelectModule,


    ],
    declarations: [
        AppComponent,
        AdminLayoutComponent,
        AuthentificationComponent,
        TesteurComponent,
        DialogComponent,
        PerimetreComponent,
        DetailReleaseComponent,
        DialogEditComponent,
        PerimetreDialogComponent,
        ManagerComponent,
        AnomalieDialogComponent,
        CasTestDialogComponent,
        ManagerDialogComponent,
        DetailScenarioDialogComponent,
        ScenarioTestDialogComponent,
        TicketDialogComponent
    ],
    providers: [SessionService, AppSessionService, AuthGuardService, GestionnaireGuardService, UserGuardService, AdminGuardService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        }
    ],
    bootstrap: [AppComponent],
    entryComponents: [ModalComponent],
})
export class AppModule {
}
