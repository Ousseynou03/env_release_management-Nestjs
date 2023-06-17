import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Profile} from '../models/Profile';
import {AppSessionService} from '../services';

@Injectable()
export class UserGuardService implements CanActivate {

    constructor(private router: Router, private app_service: AppSessionService) {
    }

    canActivate(): Observable<boolean> | Promise<boolean> | boolean {
        return new Promise(
            (resolve) => {
                if (this.app_service.isLoggedIn()) {
                    resolve(true);
                } else {
                    this.router.navigate(['/auth']).then(r => r);
                    resolve(false);
                }
            }
        );
    }

    checkAuth() {
        return (JSON.parse(localStorage.getItem('profile')) === Profile.user);
    }
}
