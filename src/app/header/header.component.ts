import { Component, OnInit } from '@angular/core';

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


  constructor() { }

  ngOnInit(): void {
  }



  aClick(){
    this.isDisable = !this.isDisable;
  }
}
