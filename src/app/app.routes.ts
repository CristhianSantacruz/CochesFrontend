import { Routes } from '@angular/router';
export const routes: Routes = [

  { path: '', redirectTo: '/authentication/login', pathMatch: 'full' },
  {
    path : "",
    loadChildren :() =>  import("./features/feature.module")
  }

];
