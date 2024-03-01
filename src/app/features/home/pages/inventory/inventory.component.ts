import {Component, OnInit} from '@angular/core';
import {NavbarComponent} from "../../components/navbar/navbar.component";
import {CarsProductsComponent} from "../../components/cars-products/cars-products.component";
import {CardDto} from "../../../../core/dto/CarDto";
import {CarService} from "../../../../core/service/car.service";
import Swal from "sweetalert2";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [
    NavbarComponent,
    CarsProductsComponent,
    NgOptimizedImage
  ],
  templateUrl: './inventory.component.html',
})
export class InventoryComponent implements  OnInit{
  public listCars : CardDto[];
  accordionStates: { [key: string]: boolean }[] = [];

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

  ngOnInit(): void {
    this.listCars.forEach(() => {
      this.accordionStates.push({
        basica: false,
        mecanica: false,
        estetica: false
      });
    });
    }

  toggleAccordion(index: number, section: string) {
    this.accordionStates[index][section] = !this.accordionStates[index][section];
  }

  isOpen(index: number, section: string): boolean {
    return this.accordionStates[index][section];
  }
}
