import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import * as firbase from 'firebase';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  //interpolation de variable
  title = "Ma super agence";
  isDisable = false;
  iScolor = "black";
  isConnect = false;


  constructor(

    //service
    private authUser: AuthenticationService

  ) { }

  ngOnInit(): void {

    firbase.auth().onAuthStateChanged((userSession)=>{
        if(userSession){
          console.log(userSession)
          this.isConnect = true
        }else{
          console.log('déco')
          this.isConnect = false

        }
      }
    )

  }



  aClick(){
    this.isDisable = !this.isDisable;
  }


  onSignout(){
    this.authUser.SingnoutUser();
  }
}
