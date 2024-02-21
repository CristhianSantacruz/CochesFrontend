import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatureRoutingModule } from './feature-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    CommonModule,
    FeatureRoutingModule,
  ]
})
export default class FeatureModule { }
