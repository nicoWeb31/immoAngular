import { Component } from '@angular/core';
import * as firbase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(){
    const firebaseConfig = {
      apiKey: "AIzaSyB5r5P8HXynedhCYSMEGhTmTM-ndQqHeXY",
      authDomain: "myagence-e581d.firebaseapp.com",
      databaseURL: "https://myagence-e581d.firebaseio.com",
      projectId: "myagence-e581d",
      storageBucket: "myagence-e581d.appspot.com",
      messagingSenderId: "95196457450",
      appId: "1:95196457450:web:17c64965d566473da6ea93"
    };

    firbase.initializeApp(firebaseConfig);
  }



}
