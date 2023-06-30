import {Component, OnDestroy, OnInit} from '@angular/core';
import { LegendItem, ChartType } from '../lbd/lbd-chart/lbd-chart.component';
import * as Chartist from 'chartist';
import {AppSessionService} from '../services';
import {Subscription} from 'rxjs';
import {Planning} from '../models/planning-model';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/environments', title: 'Environnements',  icon: 'pe-7s-science', class: 'Utilisateur' },
    { path: '/releases', title: 'Releases',  icon: 'pe-7s-note2', class: 'Utilisateur' },
    { path: '/plannings', title: 'Plannings',  icon: 'pe-7s-clock', class: 'Utilisateur' },
    { path: '/roadmaps', title: 'Roadmaps',  icon: 'pe-7s-map', class: 'Utilisateur' },
    { path: '/testeur', title: 'Testeur',  icon: 'pe-7s-user', class: 'Utilisateur' },
    { path: '/perimetre', title: 'Perimetre',  icon: 'pe-7s-info', class: 'Utilisateur' },
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
    menuItems: any[];

    public emailChartType: ChartType;
    public emailChartData: any;
    public emailChartLegendItems: LegendItem[];

    public hoursChartType: ChartType;
    public hoursChartData: any;
    public hoursChartOptions: any;
    public hoursChartResponsive: any[];
    public hoursChartLegendItems: LegendItem[];

    public activityChartType: ChartType;
    public activityChartData: any;
    public activityChartOptions: any;
    public activityChartResponsive: any[];
    public activityChartLegendItems: LegendItem[];

    planningSubscription: Subscription;
    plannings: Planning[] = [];
    planning: Planning
    public transactionData = {
        headerRow: ['Période', 'Titre', 'Options'],
        dataRows: []
    };
    today = new Date();

    constructor(private app_service: AppSessionService) { }

  ngOnInit() {
      this.menuItems = ROUTES.filter(menuItem => menuItem);
      this.emailChartType = ChartType.Pie;
      this.emailChartData = {
        labels: ['62%', '32%', '6%'],
        series: [62, 32, 6]
      };
      this.emailChartLegendItems = [
        { title: 'Open', imageClass: 'fa fa-circle text-info' },
        { title: 'Bounce', imageClass: 'fa fa-circle text-danger' },
        { title: 'Unsubscribe', imageClass: 'fa fa-circle text-warning' }
      ];

      this.hoursChartType = ChartType.Line;
      this.hoursChartData = {
        labels: ['9:00AM', '12:00AM', '3:00PM', '6:00PM', '9:00PM', '12:00PM', '3:00AM', '6:00AM'],
        series: [
          [287, 385, 490, 492, 554, 586, 698, 695, 752, 788, 846, 944],
          [67, 152, 143, 240, 287, 335, 435, 437, 539, 542, 544, 647],
          [23, 113, 67, 108, 190, 239, 307, 308, 439, 410, 410, 509]
        ]
      };
      this.hoursChartOptions = {
        low: 0,
        high: 800,
        showArea: true,
        height: '245px',
        axisX: {
          showGrid: false,
        },
        lineSmooth: Chartist.Interpolation.simple({
          divisor: 3
        }),
        showLine: false,
        showPoint: false,
      };
      this.hoursChartResponsive = [
        ['screen and (max-width: 640px)', {
          axisX: {
            labelInterpolationFnc: function (value) {
              return value[0];
            }
          }
        }]
      ];
      this.hoursChartLegendItems = [
        { title: 'Open', imageClass: 'fa fa-circle text-info' },
        { title: 'Click', imageClass: 'fa fa-circle text-danger' },
        { title: 'Click Second Time', imageClass: 'fa fa-circle text-warning' }
      ];

      this.activityChartType = ChartType.Bar;
      this.activityChartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        series: [
          [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895],
          [412, 243, 280, 580, 453, 353, 300, 364, 368, 410, 636, 695]
        ]
      };
      this.activityChartOptions = {
        seriesBarDistance: 10,
        axisX: {
          showGrid: false
        },
        height: '245px'
      };
      this.activityChartResponsive = [
        ['screen and (max-width: 640px)', {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc: function (value) {
              return value[0];
            }
          }
        }]
      ];
      this.activityChartLegendItems = [
        { title: 'Tesla Model S', imageClass: 'fa fa-circle text-info' },
        { title: 'BMW 5 Series', imageClass: 'fa fa-circle text-danger' }
      ];

      this.planningSubscription = this.app_service.getPlannings().subscribe((plannings: Planning[]) => {
          this.plannings = plannings;
          this.transactionData.dataRows = plannings.filter( (elt) => {
              return (new Date(elt.start_date).getTime() >= this.startOfWeek(this.today).getTime() &&
                      new Date(elt.start_date).getTime() <= this.endOfWeek(this.today).getTime()) ||
                  (new Date(elt.end_date).getTime() >= this.startOfWeek(this.today).getTime() &&
                      new Date(elt.end_date).getTime() <= this.endOfWeek(this.today).getTime()) ||
                  (new Date(elt.start_date).getTime() <= this.startOfWeek(this.today).getTime() &&
                      new Date(elt.end_date).getTime() >= this.endOfWeek(this.today).getTime())
          });
      });
    }

    startOfWeek(date) {
        const diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
        return new Date(date.setDate(diff));
    }

    endOfWeek(date) {
        const lastDay = date.getDate() - (date.getDay() - 1) + 6;
        return new Date(date.setDate(lastDay));
    }
    ngOnDestroy(): void {
        if (this.planningSubscription) {
            this.planningSubscription.unsubscribe();
        }
    }
}
