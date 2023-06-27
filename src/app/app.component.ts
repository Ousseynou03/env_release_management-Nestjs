import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

     constructor(public location: Location) {
         const firebaseConfig = {
             apiKey: 'AIzaSyDktlmXXholdnS_8-bgE5csN_38CmKSlz8',
             authDomain: 'env-and-releases-management.firebaseapp.com',
             projectId: 'env-and-releases-management',
             storageBucket: 'env-and-releases-management.appspot.com',
             messagingSenderId: '462093765302',
             appId: '1:462093765302:web:4e5f4e7dd78e894884f417'
        };
  
     }

    ngOnInit() {
    }

    isMap(path) {
      let title = this.location.prepareExternalUrl(this.location.path());
      title = title.slice( 1 );
      return !(path === title)
    }
}
