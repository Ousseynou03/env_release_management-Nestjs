import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';

import {AppRoutingModule} from './app.routing';
import {NavbarModule} from './shared/navbar/navbar.module';
import {FooterModule} from './shared/footer/footer.module';
import {SidebarModule} from './sidebar/sidebar.module';

import {AppComponent} from './app.component';

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
        NgbModule
    ],
    declarations: [
        AppComponent,
        AdminLayoutComponent,
        AuthentificationComponent
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
