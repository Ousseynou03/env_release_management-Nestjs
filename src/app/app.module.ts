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
import {ModalComponent} from './modal/modal.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AuthInterceptor} from './interceptors/auth.interceptor';
import { TesteurComponent } from './testeur/testeur.component';
import { DialogComponent } from './testeur/dialog/dialog/dialog.component';
import {MatTreeModule} from '@angular/material/tree';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';

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

    ],
    declarations: [
        AppComponent,
        AdminLayoutComponent,
        AuthentificationComponent,
        TesteurComponent,
        DialogComponent
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
