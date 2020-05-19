import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  solde = true;
  title = 'imoAng';
  color = true;


  getSoldValue(){
    if(this.solde){
      return 'green';
    }else{
      return 'red';
    }
  }
}
