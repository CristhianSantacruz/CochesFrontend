import { Routes } from '@angular/router';
import {AppComponent} from "./app.component";

export const routes: Routes = [
  { path: '', redirectTo: '/authentication/login', pathMatch: 'full' }, // Redirige a /authentication/login en la raíz,
  {
    path : "",
    loadChildren :() =>  import("./features/feature.module")
  }

];
