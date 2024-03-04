import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {InventoryComponent} from "./pages/inventory/inventory.component";
import {ShoopingcarComponent} from "./pages/shoopingcar/shoopingcar.component";
import {OrderhistoryComponent} from "./pages/orderhistory/orderhistory.component";
import {AboutmeComponent} from "./pages/aboutme/aboutme.component";

const routes: Routes = [
  {
    path : "products",
    component:InventoryComponent
  },
  {
    path : "shopping",
    component : ShoopingcarComponent
  },
  {
    path: "historical",
    component : OrderhistoryComponent
  },
  {
    path : "about",
    component : AboutmeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
