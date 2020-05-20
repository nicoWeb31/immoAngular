import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Property } from 'src/app/interface/property'




@Injectable({
  providedIn: 'root'
})
export class PropertiesService {


  properties:Property []


  //observable et observeur
  propertiesSubject = new Subject<Property[]>();

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

  createPropertie(property: Property){
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

  udapdateProperties(prop: Property,i){
    //la propiete a l'index i prend la nouvelle valeur
      this.properties[i] = prop;
      //on emmet
      this.emitProperties();
  }


}
