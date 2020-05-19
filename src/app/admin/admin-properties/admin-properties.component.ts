import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-properties',
  templateUrl: './admin-properties.component.html',
  styleUrls: ['./admin-properties.component.css']
})
export class AdminPropertiesComponent implements OnInit {


  propertiesForm: FormGroup;

  constructor(
    //service form builder
    private formBuilder : FormBuilder
  ) { }

  ngOnInit(): void {
    this.initPropertiesForm();
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
    console.log(this.propertiesForm.value)

  }

}
