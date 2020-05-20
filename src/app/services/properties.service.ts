import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PropertiesService {


  properties = [
    {title:'Ma super maison',category:'Maison',sold:true,price:3400000,room:4,surface:344},
    {title:'Villa sur la mer',category:'Maison',sold:false,price:24000,room:4,surface:344},
    {title:'Appart maraca',category:'Appartement',sold:true,price:134000,surface:344},
    {title:'petit apprt minable',category:'Appartement',sold:false,price:31000,surface:344}

  ]


  //observable et observeur
  propertiesSubject = new Subject<any[]>();

  constructor() { }

  emitProperties(){
    this.propertiesSubject.next(this.properties);
  }


  // ===========================================================================
  // get properties
  // ===========================================================================
  getProperties(){}


  // ===========================================================================
  // create properties
  // ===========================================================================

  createPropertie(property){
    this.properties.push(property);
  }

  // ===========================================================================
  // delete properties
  // ===========================================================================
  deleteProperties(index){
    // splice je supprime a partir de l'index un nombre d'element ici 1
    this.properties.splice(index,1);
    //on met a jour le tableau
    this.emitProperties();
  }

  // ===========================================================================
  // udapdateProperties update
  // ===========================================================================

  udapdateProperties(prop,i){
    //la propiete a l'index i prend la nouvelle valeur
      this.properties[i] = prop;
      //on emmet
      this.emitProperties();
  }


}
