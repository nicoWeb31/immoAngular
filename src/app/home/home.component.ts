import { Component, OnInit, OnDestroy } from '@angular/core';
import {PropertiesService} from '../services/properties.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  //on import le servise dans le construct acces a toute les propriete presente dans propriétéService
  constructor(
    private PropertiesService : PropertiesService
    ) { }

    properties = [];
    // subscription pour s'abonner de type subscription
    propertiesSubscription : Subscription;

  //component did mount? - chargemetn au montage du composant
  ngOnInit(): void {

    this.propertiesSubscription = this.PropertiesService.propertiesSubject.subscribe(
        (data:any)=>{
          this.properties = data;
        }
    );
    this.PropertiesService.emitProperties();

  }




  getSoldValue(index){
    if(this.properties[index].sold){
      return 'green';
    }else{
      return 'red';
    }
  }



  //dechargement desabonnemrnt
  ngOnDestroy(){
    this.propertiesSubscription.unsubscribe();
  }

}
