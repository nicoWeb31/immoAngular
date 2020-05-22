import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AdminDashbordComponent } from './admin/adminDashbord/admin-dashbord.component';
import { AdminPropertiesComponent } from './admin/admin-properties/admin-properties.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { SigninComponent } from './authentication/signin/signin.component';
import { SinglePropertyComponent } from './single-property/single-property.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    AdminDashbordComponent,
    AdminPropertiesComponent,
    SigninComponent,
    SinglePropertyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
