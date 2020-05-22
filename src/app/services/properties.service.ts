import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Property } from 'src/app/interface/property';
import * as firbase from 'firebase';




@Injectable({
  providedIn: 'root'
})
export class PropertiesService {


  properties:Property [] = [];


  //observable et observeur
  propertiesSubject = new Subject<Property[]>();

  constructor() { }

  emitProperties(){
    this.propertiesSubject.next(this.properties);
  }

  saveProperties(){
    //rep data from firebase et push in my array properties
    firbase.database().ref('/properties').set(this.properties);
  }


  // ===========================================================================
  // get properties
  // ===========================================================================
  getProperties(){
    //listen db and save value in properties ---- 'on' ecoute permanent la bdd
    firbase.database().ref('/properties').on('value',(data)=>{
      this.properties = data.val() ? data.val() : [];
      this.emitProperties();
    });


  }


  // ===========================================================================
  // create properties
  // ===========================================================================

  createPropertie(property: Property){
    this.properties.push(property);
    this.saveProperties();
    this.emitProperties();
  }

  // ===========================================================================
  // delete properties
  // ===========================================================================
  deleteProperties(index){
    // splice je supprime a partir de l'index un nombre d'element ici 1
    this.properties.splice(index,1);
    this.saveProperties();
    //on met a jour le tableau
    this.emitProperties();
  }

  // ===========================================================================
  // udapdateProperties update
  // ===========================================================================

  udapdateProperties(prop: Property,i){
    // //la propiete a l'index i prend la nouvelle valeur
    //   this.properties[i] = prop;
    //   this.saveProperties();
    //   //on emmet
    //   this.emitProperties();


      //or

      firbase.database().ref(`/properties/${i}`).update(prop).catch(
        (err) =>{
          console.error(err);
        }
      )

  }


}
