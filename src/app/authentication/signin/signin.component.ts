import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {



  //form Group modele de donner pour methode reactive
  singinForm: FormGroup;


  constructor(

    //reactive form import formBuilder
    private formBuilder: FormBuilder,

    //service
    private authService: AuthenticationService,
    private router: Router

  ) { }

  ngOnInit(): void {

    //on initialise le form
    this.initSigninForm();

  }

  initSigninForm(){
    this.singinForm = this.formBuilder.group({

      email: ['',[Validators.required,Validators.email]],
      password: ['',[Validators.required, Validators.minLength(6)]]

    });
  }

  // ===========================================================================
  //onSubmitSigninForm()
  // ===========================================================================
  onSubmitSigninForm(){

    const email = this.singinForm.get('email').value;
    console.log(email);
    const password = this.singinForm.get('password').value;

    //comme on retourne une promise on peut faire un then
    this.authService.singnInUser(email,password).then(
      (data)=>{
        //console.log(data)
        this.router.navigate(['/admin','admin-dashbord']) /// redirect admin/admin-dashbord
      }
    ).catch(
      (err)=>{
        console.log(err)
      }
    )

  }



}
