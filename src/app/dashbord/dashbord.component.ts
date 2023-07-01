import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppSessionService } from '../services/app-session.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit , OnDestroy{

  data: any;

  dataTest : any;

  chartOptions: any;

  subscription!: Subscription;



  tt!: number;
  tc!: number;
  ok!: number;
  ko!: number;
  nt!: number;
  ab!: number;
  bl!: number;
  hp!: number;

  ttp!: number;
  tcp!: number;
  okp!: number;
  kop!: number;
  ntp!: number;
  abp!: number;
  blp!: number;
  hpp!: number;

  id!: number;
  info: any;


  ctt!: number;
  ctlt!: number;
  cok!: number;
  cko!: number;
  cbl!: number;
  cnt!: number;
  chp!: number;

  cttp!: number;
  ctltp!: number;
  cokp!: number;
  ckop!: number;
  cblp!: number;
  cntp!: number;
  chpp!: number;

  BLAT!: number;
  BLCO!: number;
  BLVE!: number;
  BLVC!: number;
  BLRE!: number;
  BLPD!: number;
  BLAPE!: number;
  BLT!: number;

  MJAT!: number;
  MJCO!: number;
  MJVE!: number;
  MJVC!: number;
  MJRE!: number;
  MJPD!: number;
  MJAPE!: number;
  MJT!: number;

  MNAT!: number;
  MNCO!: number;
  MNVE!: number;
  MNVC!: number;
  MNRE!: number;
  MNPD!: number;
  MNAPE!: number;
  MNT!: number;


  T1!: number;
  T2!: number;
  T3!: number;
  T4!: number;
  T5!: number;
  T6!: number;
  T7!: number;
  T8!: number;

  constructor(protected activatedRoute: ActivatedRoute,
    private app_service: AppSessionService,) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(() => {
        this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
        this.info = this.activatedRoute.snapshot.paramMap.get('nomRelase');
      });
  
    
    this.app_service.getVisionTicket(this.id)
    .subscribe({
        next:(value)=> {
            this.tt=Number(value[0]);
            this.tc=Number(value[1]);
            this.ok=Number(value[2]);
            this.ko=Number(value[3]);
            this.nt=Number(value[4]);
            this.ab=Number(value[5]);
            this.bl=Number(value[6]);
            this.hp=Number(value[7]);

            if (this.tt!=0) {
                this.ttp=100;
                this.tcp=Math.trunc((this.tc/this.tt)*100);
                this.okp=Math.trunc((this.ok/this.tt)*100);
                this.kop=Math.trunc((this.ko/this.tt)*100);
                this.ntp=Math.trunc((this.nt/this.tt)*100);
                this.abp=Math.trunc((this.ab/this.tt)*100);
                this.blp=Math.trunc((this.bl/this.tt)*100);
                this.hpp=Math.trunc((this.hp/this.tt)*100);
            }
            else{
                this.ttp=0;
                this.tcp=0;
                this.okp=0;
                this.kop=0;
                this.ntp=0;
                this.abp=0;
                this.blp=0;
                this.hpp=0;
            }
            

            this.data = {
                labels: ['OK','KO', 'Non testés', 'Abandonnés', 'Bloquée','Hors Périmètre'],
                datasets: [
                    {
                        
                        data: [this.ok, this.ko, this.nt, this.ab, this.bl, this.hp],
                        backgroundColor: [
                           
                            "#36A2EB",
                            "#FFCE56",
                            "#7E57C2",
                            "#66BB6A",
                            "#370028",
                            "#26C6DA"
                            
                        ],
                        hoverBackgroundColor: [
                            
                            "#36A2EB",
                            "#FFCE56",
                            "#7E57C2",
                            "#66BB6A",
                            "#370028",
                            "#26C6DA"
                            
        
                        ]
                    }
                ]
            };
        },error(err) {
            alert("le serveur ne répond pas. Merci de réassayer ultérieument");
        },
    });


    this.app_service.getVisionCasTest(this.id)
    .subscribe({
        next:(value) =>{
            this.ctt=Number(value[1]);
            this.ctlt=Number(value[0]);
            this.cok=Number(value[2]);
            this.cko=Number(value[3]);
            this.cbl=Number(value[4]);
            this.cnt=Number(value[5]);
            this.chp=Number(value[4]);
            
            if(this.ctt!=0){
                this.cttp=100;
                this.ctltp=Math.trunc((this.ctlt/this.ctt)*100);
                this.cokp=Math.trunc((this.cok/this.ctt)*100);
                this.ckop=Math.trunc((this.cko/this.ctt)*100);
                this.cblp=Math.trunc((this.cbl/this.ctt)*100);
                this.cntp=Math.trunc((this.cnt/this.ctt)*100);
                this.chpp=Math.trunc((this.chp/this.ctt)*100);
            }
            else{
                this.cttp=0;
                this.ctltp=0;
                this.cokp=0;
                this.ckop=0;
                this.cblp=0;
                this.cntp=0;
                this.chpp=0;
            }
            

            this.dataTest = {
                labels: ['OK','KO', 'Bloqués', 'Non Testés', 'Hors Périmètre'],
                datasets: [
                    {
                        data: [this.cok, this.cko, this.cbl, this.cnt, this.chp],
                        backgroundColor: [
                            "#FF00FF",
                            "#000080",
                            "#00FF00",
                            "#800000",
                            "#FF0000"
                        ],
                        hoverBackgroundColor: [
                            "#FF00FF",
                            "#000080",
                            "#00FF00",
                            "#800000",
                            "#FF0000"
                        ]
                    }
                ]
            };


        },error(err) {
            alert("le serveur ne répond pas. Merci de réassayer ultérieument");
        },
    })

       

    this.app_service.getVisionBloquante(this.id)
    .subscribe({
        next:(value) =>{
            this.BLAT=value[0];
            this.BLCO=value[1];
            this.BLVE=value[2];
            this.BLVC=value[3];
            this.BLRE=value[4];
            this.BLPD=value[5];
            this.BLAPE=value[6];
            this.BLT=value[0]+value[1]+value[2]+value[3]+value[4]+value[5]+value[6];
        },error(err) {
            alert("les Donnees ne peuvent pas etre charge");
        },
    });

    this.app_service.getVisionMajeuret(this.id)
    .subscribe({
        next:(value) =>{
            this.MJAT=value[0];
            this.MJCO=value[1];
            this.MJVE=value[2];
            this.MJVC=value[3];
            this.MJRE=value[4];
            this.MJPD=value[5];
            this.MJAPE=value[6];
            this.MJT=value[0]+value[1]+value[2]+value[3]+value[4]+value[5]+value[6]
        },error(err) {
            alert("les Donnees ne peuvent pas etre charge");
        },
    });

    this.app_service.getVisionMineure(this.id)
    .subscribe({
        next:(value) =>{
            this.MNAT=value[0];
            this.MNCO=value[1];
            this.MNVE=value[2];
            this.MNVC=value[3];
            this.MNRE=value[4];
            this.MNPD=value[5];
            this.MNAPE=value[6];
            this.MNT=value[0]+value[1]+value[2]+value[3]+value[4]+value[5]+value[6]
        },error(err) {
            alert("les Donnees ne peuvent pas etre charge");
        },
    });
    

  }

  getLightTheme() {
    return {
        plugins: {
            legend: {
                labels: {
                    color: '#495057'
                }
            }
        }
    }
}

getDarkTheme() {
    return {
        plugins: {
            legend: {
                labels: {
                    color: '#ebedef'
                }
            }
        }
    }
}

ngOnDestroy(): void {
  if (this.subscription) {
      this.subscription.unsubscribe();
  }
}

}