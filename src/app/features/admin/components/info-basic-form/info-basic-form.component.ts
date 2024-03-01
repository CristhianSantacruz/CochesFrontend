import {Component, OnInit} from '@angular/core';
import {ControlContainer, ReactiveFormsModule} from "@angular/forms";
import {BrandCarDto} from "../../../../core/dto/BrandCarDto";
import {BrandCardService} from "../../../../core/service/brand-card.service";

@Component({
  selector: 'app-info-basic-form',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './info-basic-form.component.html',
})
export class InfoBasicCarComponent implements  OnInit{

  public infoBasicForm : any ;
  public listBrandCar : BrandCarDto[];

  constructor(private controlContainer : ControlContainer,private brandCarService : BrandCardService) {
    this.brandCarService.getAllBrandCars().subscribe({
      next : value => {this.listBrandCar = value}
    })
  }
  ngOnInit()  : void {
      this.infoBasicForm= this.controlContainer.control;
      this.infoBasicForm = this.infoBasicForm.controls["infoBasicForm"]
  }

}
