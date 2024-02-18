import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path : "authentication",
    loadChildren :() =>  import("./auth/auth.module").then( a => a.AuthModule)
  },

  {
   path : "home",
   loadChildren : () => import("./home/home.module")
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureRoutingModule { }
