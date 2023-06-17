import {Component, OnInit} from '@angular/core';
import {AppSessionService, SessionService} from '../services';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';


@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css']
})
export class AuthentificationComponent implements OnInit {
  login: FormGroup;

  constructor(private api_service: SessionService, private router: Router, private app_service: AppSessionService) {
  }

  ngOnInit(): void {
    this.buildLoginForm()
  }

  buildLoginForm(): void {
    this.login = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  onLogin(formValue) {
    this.app_service.login(formValue).subscribe(() => {
          Swal.fire({
            icon: 'success',
            title: 'Bienvenue.',
            showConfirmButton: false,
            timer: 1500
          }).then();
          this.router.navigate(['']).then(r => r);
        },
        (error) => {
          let message: string;
          if (error.code === 'auth/user-not-found') {
            message = 'Adresse Email invalide!';
          } else if (error.code === 'auth/wrong-password') {
            message = 'Mot de passe incorrecte!';
          } else if (error.code === 'userNotActived') {
            message = 'Votre compte a été désactivé. Veuillez contacter l\'administrateur!';
          } else {
            message = 'Une erreur est survenue. Veuillez réessayer svp!';
          }
          Swal.fire(
              'Oups!',
              message,
              'error'
          ).then();
        });

/*    this.api_service.signInUser(formValue).then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Bienvenue.',
            showConfirmButton: false,
            timer: 1500
          }).then();
          this.router.navigate(['']);
        },
        (error) => {
          let message: string;
          if (error.code === 'auth/user-not-found') {
            message = 'Adresse Email invalide!';
          } else if (error.code === 'auth/wrong-password') {
            message = 'Mot de passe incorrecte!';
          } else if (error.code === 'userNotActived') {
            message = 'Votre compte a été désactivé. Veuillez contacter l\'administrateur!';
          } else {
            message = 'Une erreur est ssurvenue. Veuillez réessayer svp!';
          }
          Swal.fire(
              'Oups!',
              message,
              'error'
          ).then();
        });*/
  }

}
