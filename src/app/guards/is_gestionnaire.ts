import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {Observable} from 'rxjs';
import firebase from 'firebase/app';
import {Profile} from '../models/Profile';

@Injectable()
export class GestionnaireGuardService implements CanActivate {

    constructor(private router: Router) {
    }

    canActivate(): Observable<boolean> | Promise<boolean> | boolean {
        return new Promise(
            (resolve, reject) => {
                firebase.auth().onAuthStateChanged(
                    (user) => {
                        if (user) {
                            const verify = this.checkAuth();
                            if (verify) {
                                resolve(true);
                            } else {
                                this.router.navigate(['/auth']);
                                resolve(false);
                            }
                        } else {
                            this.router.navigate(['/auth']);
                            resolve(false);
                        }
                    }
                );
            }
        );
    }

    checkAuth() {
        return (JSON.parse(localStorage.getItem('profile')) === Profile.gestionnaire);
    }
}
