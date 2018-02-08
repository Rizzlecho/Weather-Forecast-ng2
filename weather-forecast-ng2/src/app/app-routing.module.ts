import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {HomeComponent} from "./components/home/home.component";
import {HeaderComponent} from "./components/forecast/forecast.component";



const routes: Routes = [
  {path: '', pathMatch: 'full' , redirectTo: '/home'},
  {path: 'home', component:HomeComponent},
  {path: 'forecast/:location', component: HeaderComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
