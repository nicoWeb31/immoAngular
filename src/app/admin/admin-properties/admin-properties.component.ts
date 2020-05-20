import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PropertiesService } from '../../services/properties.service';
import { Subscription } from 'rxjs';
import * as $ from 'jquery';

@Component({
  selector: 'app-admin-properties',
  templateUrl: './admin-properties.component.html',
  styleUrls: ['./admin-properties.component.css']
})
export class AdminPropertiesComponent implements OnInit {




  propertiesForm: FormGroup;
  propSubscription: Subscription;
  properties: any[] = [];

  indexToRemove;
  indexToUpdate;
  editMode = false;



  constructor(
    //service form builder
    private formBuilder : FormBuilder,
    private popServ :PropertiesService
  ) { }

  ngOnInit(): void {

    this.initPropertiesForm();
    this.popServ.propertiesSubject.subscribe(
      (data) =>{
        //data dans mon tableau porertie
        this.properties = data;
      }
    );
    //emission des donner
    this.popServ.emitProperties();
  }


  initPropertiesForm(){
    this.propertiesForm = this.formBuilder.group({
      title:['',Validators.required],
      category:'',
      surface:['',Validators.required],
      room:['',Validators.required],
      descr:'',
      price:''

    })
  }

  onSubmitPropertiesForm(){
    //console.log(form.value)
    // const t = form.value['title']
    // console.log(t);
    //console.log(this.propertiesForm.value)

    const newProperty = this.propertiesForm.value;
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
    this.popServ.deleteProperties(this.indexToRemove);
    $('#exampleModalLong').modal('hide');
  }


  // ===========================================================================
  // onEdit
  // ===========================================================================
  onEditPrprop(property){


    //on passe en mode edit
    this.editMode = true;

    //console.log(property);
    $('#propertiesFormModal').modal('show');
    this.propertiesForm.get('title').setValue(property.title);
    this.propertiesForm.get('category').setValue(property.category);
    this.propertiesForm.get('surface').setValue(property.surface);
    this.propertiesForm.get('room').setValue(property.room);
    this.propertiesForm.get('descr').setValue(property.descr);
    this.propertiesForm.get('price').setValue(property.price);

    const i = this.properties.findIndex(
      (propEl)=>{
        if(propEl === property) return true
      }
    )
    this.indexToUpdate = i;




  }

}
