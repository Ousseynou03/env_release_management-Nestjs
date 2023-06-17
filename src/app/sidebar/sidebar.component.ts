import { Component, OnInit } from '@angular/core';
import {AppSessionService} from '../services';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'pe-7s-graph', class: 'Admin Gestionnaire Utilisateur' },
    { path: '/environments', title: 'Environnements',  icon: 'pe-7s-science', class: 'Utilisateur' },
    { path: '/releases', title: 'Releases',  icon: 'pe-7s-note2', class: 'Utilisateur' },
    { path: '/plannings', title: 'Plannings',  icon: 'pe-7s-clock', class: 'Utilisateur' },
    { path: '/roadmaps', title: 'Roadmaps',  icon: 'pe-7s-map', class: 'Utilisateur' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(private app_service: AppSessionService) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      return $(window).width() <= 991;
  };

  getRole() {
      return this.app_service.getRole()
  }

}
