import { Routes } from '@angular/router';
import {AppComponent} from "./app.component";

export const routes: Routes = [
  {
    path : "",
    loadChildren :() =>  import("./features/feature.module").then( f => f.FeatureModule)
  }

];
