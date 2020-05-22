import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PropertiesService } from '../../services/properties.service';
import { Subscription } from 'rxjs';
import * as $ from 'jquery';
import { Property } from 'src/app/interface/property'

@Component({
  selector: 'app-admin-properties',
  templateUrl: './admin-properties.component.html',
  styleUrls: ['./admin-properties.component.css']
})
export class AdminPropertiesComponent implements OnInit {




  propertiesForm: FormGroup;
  propSubscription: Subscription;
  properties: Property[] = [];

  indexToRemove;
  indexToUpdate;
  editMode = false;

  photoUploading = false;
  photoUploded = false;
  photoAdded: any[] = [];



  constructor(
    //service form builder
    private formBuilder : FormBuilder,
    private popServ :PropertiesService
  ) { }

  ngOnInit(): void {

    this.initPropertiesForm();
    this.popServ.propertiesSubject.subscribe(
      (data: Property[]) =>{
        //data dans mon tableau porertie
        this.properties = data;
      }
    );
    //emission des donner
    this.popServ.emitProperties();

    //recup des data
    this.popServ.getProperties();
  }


  initPropertiesForm(){
    this.propertiesForm = this.formBuilder.group({
      title:['',Validators.required],
      category:'',
      surface:['',Validators.required],
      room:['',Validators.required],
      descr:'',
      price:'',
      sold:'',

    })
  }

  onSubmitPropertiesForm(){
    //console.log(form.value)
    // const t = form.value['title']
    // console.log(t);
    //console.log(this.propertiesForm.value)

    const newProperty: Property = this.propertiesForm.value;
    newProperty.sold = this.propertiesForm.get('sold').value ? this.propertiesForm.get('sold').value : false ;


    newProperty.photos = this.photoAdded ? this.photoAdded : [];


    //log du new tableau
    //console.log(this.properties);
    //si edit mode on fait un update sinon un crerate

    if(this.editMode){
      this.popServ.udapdateProperties(newProperty,this.indexToUpdate)

    }else{
      this.popServ.createPropertie(newProperty);
    }
    $('#propertiesFormModal').modal('hide');


  }


  //reset form
  resteForm(){
    this.propertiesForm.reset();
    this.editMode=false;
    this.photoAdded = [];
  }

  //delete prpperties
  onDelteProp(index){
    //console.log(this.properties[index])
    //avec message d'alert:
    // if(confirm("etes-vous sur?")) this.popServ.deleteProperties(index);

    //avec la modale:
    $('#exampleModalLong').modal('show');
    //je passe l'id pour la supression dans onConfirmDeletePrpop
    this.indexToRemove = index;

  }

  onConfirmDeletePrpop(){
    //remove file
    // if(this.properties[this.indexToRemove].photo && this.properties[this.indexToRemove].photo !== ""){

    //   this.popServ.removeFile(this.properties[this.indexToRemove].photo);
    // }

    this.properties[this.indexToRemove].photos.forEach(
      (item)=>{
        this.popServ.removeFile(item)
      }
    )

    this.popServ.deleteProperties(this.indexToRemove);
    $('#exampleModalLong').modal('hide');
  }


  // ===========================================================================
  // onEdit
  // ===========================================================================
  onEditPrprop(property: Property){


    //on passe en mode edit
    this.editMode = true;

    //console.log(property);
    $('#propertiesFormModal').modal('show');
    this.propertiesForm.get('title').setValue(property.title);
    this.propertiesForm.get('category').setValue(property.category);
    this.propertiesForm.get('surface').setValue(property.surface);
    this.propertiesForm.get('room').setValue(property.room);
    this.propertiesForm.get('descr').setValue(property.descr ? property.descr : '');
    this.propertiesForm.get('price').setValue(property.price);
    this.propertiesForm.get('sold').setValue(property.sold);
    this.photoAdded = property.photos ? property.photos : [];



    const i = this.properties.findIndex(
      (propEl)=>{
        if(propEl === property) return true
      }
    )
    this.indexToUpdate = i;

  }

  onUploadFile(event){
    console.log(event);
    this.photoUploading = true;

//si j'ai deja une photo je delete l'ancienne
    // if(this.photoUrl && this.photoUrl !== ''){
    //   this.popServ.removeFile(this.photoUrl);
    // }

    this.popServ.uploadFile(event.target.files[0]).then(
      (url: string)=>{
        this.photoAdded.push(url);
        this.photoUploading = false;
        this.photoUploded = true;
        setTimeout(()=>{
          this.photoUploded = false;
        },4000)
      }
    );
  }

  deletOnePhoto(i){
    this.popServ.removeFile(this.photoAdded[i]);
    //maj tableau de photo
    this.photoAdded.splice(i,1);

  }




}
