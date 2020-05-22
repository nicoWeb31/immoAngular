import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Property } from 'src/app/interface/property';
import * as firbase from 'firebase';
import { promise } from 'protractor';
import { resolve } from 'dns';
import { rejects } from 'assert';




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

  uploadFile(file: File)
  {
    return new Promise((resolve,reject)=>{

      const uniqId = Date.now().toString();
      const upload = firbase.storage().ref().child('images/properties/' + uniqId + file.name).put(file);
      upload.on(firbase.storage.TaskEvent.STATE_CHANGED,
        //pending
        ()=>{
          console.log('chargement')
        },
        //error
        (err)=>{
          console.error(err);
          reject(err);
        },
        //succes catch link url file
        ()=>{
          upload.snapshot.ref.getDownloadURL().then(
            (downLoadUrl)=>{
              resolve(downLoadUrl);
            }
          )
        }
        )
    }
    )}

    // =========================================================================
    // remove files
    // =========================================================================
    removeFile(fileLink: string){
      if(fileLink){
        //on recupere l'emplacement du fichier
        const storageRef = firbase.storage().refFromURL(fileLink);
        storageRef.delete().then(
          ()=>{
            console.log('delete ok');
          }
        ).catch((err)=>{
          console.error(err)
        })
      }
    }


}
