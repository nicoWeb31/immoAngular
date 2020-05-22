import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminDashbordComponent } from './admin/adminDashbord/admin-dashbord.component';
import { SigninComponent } from './authentication/signin/signin.component';
import {SinglePropertyComponent} from './single-property/single-property.component'



const routes: Routes = [
  {path: 'home', component: HomeComponent },

  {path : 'admin/admin-dashbord', component: AdminDashbordComponent },
  {path : 'login', component : SigninComponent},
  {path: 'property/:id', component: SinglePropertyComponent },
  //url vide
  {path : '', redirectTo: 'home', pathMatch: 'full' },

  //toute autre url redirect vers home
  {path : '**', redirectTo: 'home'}
];

@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
