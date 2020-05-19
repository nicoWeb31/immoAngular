import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PropertiesService {


  properties = [
    {title:'Ma super maison',category:'Maison',sold:true},
    {title:'Villa sur la mer',category:'Maison',sold:false},
    {title:'Appart maraca',category:'appart',sold:true},
    {title:'petit apprt minable',category:'Appart',sold:false}

  ]


  //observable et observeur
  propertiesSubject = new Subject<any[]>();

  constructor() { }

  emitProperties(){
    this.propertiesSubject.next(this.properties);
  }


  getProperties(){}

}
