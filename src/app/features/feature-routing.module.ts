import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuardWithAuth, AuthGuardWithoutAuth, canActiveWithRolAdmin} from "../core/guards/auth.guard";

const routes: Routes = [
  {
    path : "authentication",
    canActivate : [AuthGuardWithAuth],
    loadChildren :() =>  import("./auth/auth.module")
  },

  {
   path : "home",
    canActivate : [AuthGuardWithoutAuth],
   loadChildren : () => import("./home/home.module")
  },
   {
    path : "admin",
    canActivate : [canActiveWithRolAdmin],
    loadChildren : () => import("./admin/admin.module").then(a => a.AdminModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureRoutingModule { }
