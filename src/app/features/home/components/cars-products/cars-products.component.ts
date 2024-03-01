import { Component } from '@angular/core';
import {BrandCarDto} from "../../../../core/dto/BrandCarDto";
import {CardDto} from "../../../../core/dto/CarDto";
import {CarService} from "../../../../core/service/car.service";
import Swal from "sweetalert2";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-cars-products',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './cars-products.component.html'
})
export class CarsProductsComponent {

  public listCars : CardDto[];

  constructor(private carService : CarService) {
    this.carService.getAllCars().subscribe({
      next : value=> {
        this.listCars = value;
      },
      error : err => {
        Swal.fire({
          icon : "error",
          title : "Opss..",
          text : "Hubo un problema al mostrar los autos"
        });
      }
    })


  }

}
