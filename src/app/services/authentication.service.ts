import { Injectable } from '@angular/core';
import * as firbase from 'firebase';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  constructor() { }

  //create compte user
  // singnupUser(email: string,password: string){
  //   return new Promise(
  //     (resolve,reject) =>{
  //       firbase.auth().createUserWithEmailAndPassword(email,password).then(
  //         ()=>{
  //           console.log('Connecté');
  //           resolve();
  //         }
  //       ).catch((err)=>{
  //         reject(err);
  //       })
  //     }
  //   )
  // }

  singnInUser(email: string,password: string){
    return new Promise(
      (resolve,reject) =>{
        firbase.auth().signInWithEmailAndPassword(email,password).then(
          (data)=>{
            console.log('Connecté');
            resolve(data);
          }
        ).catch((err)=>{
          reject(err);
        })
      }
    )
  }

  // ===========================================================================
  // deco
  // ===========================================================================
  SingnoutUser(){
    //superssion du cookie
    firbase.auth().signOut();
  }




}
