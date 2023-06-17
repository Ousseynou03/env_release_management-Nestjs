import {Component, ElementRef, OnInit} from '@angular/core';
import {ROUTES} from '../../sidebar/sidebar.component';
import {Location} from '@angular/common';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import {AppSessionService, SessionService} from '../../services';
import {User} from '../../models/user';
import * as envs_data from '../../models/environments-data';

@Component({
    // moduleId: module.id,
    // tslint:disable-next-line:component-selector
    selector: 'navbar-cmp',
    templateUrl: 'navbar.component.html'
})

export class NavbarComponent implements OnInit {
    private listTitles: any[];
    location: Location;
    private toggleButton: any;
    private sidebarVisible: boolean;
    user: User = new User();
    env_data = envs_data.arrayData;


    constructor(location: Location, private element: ElementRef,
                private router: Router, private api_service: SessionService,  private app_service: AppSessionService) {
        this.location = location;
        this.sidebarVisible = false;
    }

    ngOnInit() {
        this.listTitles = ROUTES.filter(listTitle => listTitle);
        const navbar: HTMLElement = this.element.nativeElement;
        this.app_service.getUser().subscribe(user => {
            console.log(user)
            this.user.profile = JSON.parse(localStorage.getItem('profile'))
            this.user.prenom = user.prenom
            this.user.nom = user.nom
        })
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
    }

    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const body = document.getElementsByTagName('body')[0];
        setTimeout(function () {
            toggleButton.classList.add('toggled');
        }, 500);
        body.classList.add('nav-open');

        this.sidebarVisible = true;
    };

    sidebarClose() {
        const body = document.getElementsByTagName('body')[0];
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        body.classList.remove('nav-open');
    };

    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
    };

    getTitle() {
        let titlee = this.location.prepareExternalUrl(this.location.path());
        let nextTitle: string;
        if (titlee.charAt(0) === '#') {
            titlee = titlee.slice(1);
        }

        if (titlee.includes('environmentDetail')) {
            if (titlee.charAt(titlee.length - 2) === '/') {
                nextTitle = this.env_data.filter( elt => {
                    return (elt.id).toString() === titlee.charAt(titlee.length - 1)
                })[0].title;
            }
            if (titlee.charAt(titlee.length - 3) === '/') {
                nextTitle = this.env_data.filter( elt => {
                    return (elt.id).toString() === titlee.slice(titlee.length - 2)
                })[0].title;
            }
        }

        if (titlee.includes('planningDetail')) {
            nextTitle = 'Détails planning'
        }

        if (nextTitle) {
            return nextTitle;
        }

        for (let item = 0; item < this.listTitles.length; item++) {
            if (this.listTitles[item].path === titlee) {
                return this.listTitles[item].title;
            }
        }
        return 'Dashboard';
    }

    signOut() {
        this.app_service.logout().then(() => {
                this.router.navigate(['auth']);
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'A très bientôt.',
                    showConfirmButton: false,
                    timer: 1500
                }).then();
            },
            (error) => {
                Swal.fire(
                    'Oups!',
                    'Une erreur est survenue : ' + error,
                    'error'
                ).then();
            });
    }
}

