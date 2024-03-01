import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterCarComponent} from "./pages/register-car/register-car.component";

const routes: Routes = [
  {
    path: "",
    component:RegisterCarComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
