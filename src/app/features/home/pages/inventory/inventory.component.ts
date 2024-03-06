import {Component } from '@angular/core';
import {NavbarComponent} from "../../components/navbar/navbar.component";
import {CarsProductsComponent} from "../../components/cars-products/cars-products.component";
import {CardDto} from "../../../../core/dto/CarDto";
import {CarService} from "../../../../core/service/car.service";
import Swal from "sweetalert2";
import {NgOptimizedImage} from "@angular/common";
import {CarPurchase} from "../../../../core/dto/CarPurchase";
import {TokenService} from "../../../../core/service/token.service";
import {UserDto} from "../../../../core/dto/UserDto";

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
export class InventoryComponent{
  public isAdmin : boolean = false;
  public listCars : CardDto[];
  public carsPurchases : Array<CarPurchase>;
  decodeToken : UserDto;

  constructor(private carService : CarService , private tokenService : TokenService) {
    this.decodeToken = this.tokenService.getInfoToken()
    if(this.decodeToken.rol === "ADMIN"){
      this.isAdmin = true;

    }

    this.carsPurchases = []
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

  public addCarShoppingCart(carDtoNew : CardDto): void {

    console.log("Car Dto que se agrego",carDtoNew)

    let added : boolean = false;

    if(this.carsPurchases.length > 0){
      for (let i : number = 0 ; i< this.carsPurchases.length && !added ; i++ ){
           let car : CarPurchase = this.carsPurchases[i];
           if(car.codeCar === carDtoNew.serial){
             if((car.quantity+1) > carDtoNew.stock){
               Swal.fire({
                 icon : "error",
                 title : "Error al Agregar",
                 text : "No puedes agrefar cantidad superiores al stock"
               });
               added = true;
             }else {
               car.quantity += 1;
               car.total += carDtoNew.price
               added = true;
               Swal.fire({
                 icon : "success",
                 title : "Se agrego correctamente",
               });
             }
           }
        }
    }
   if(!added){
     let carPurchase : CarPurchase = {
       codeCar : carDtoNew.serial,
       quantity : 1,
       total : carDtoNew.price,
       image : carDtoNew.pathImage,
       referenceCar : carDtoNew.reference
     };
     this.carsPurchases.push(carPurchase)
     Swal.fire({
       icon : "success",
       title : "Se agrego correctamente",
     });

   }

    localStorage.setItem('carsPurchases',JSON.stringify(this.carsPurchases));

  }
  public removeCarShoppingCart(carDtoNew : CardDto): void {
    let carActual : CarPurchase = this.carsPurchases.find(
      car  => car.codeCar == carDtoNew.serial
    )
    let deleted : boolean = false;
    if(carActual == null){
      Swal.fire({
        icon: "info",
        title : "Eliminar del carrito",
        text : "No agregado ninguna unidad a este coche"
      })
    } else {

      for( let  i : number = 0; i< this.carsPurchases.length && !deleted;i++){
        let car : CarPurchase = this.carsPurchases[i];
        if(car.codeCar == carDtoNew.serial){
          if((car.quantity-1)==0){
            this.carsPurchases.splice(1,1);
          }else {
            car.quantity -=1;
            car.total -= carDtoNew.price;
            deleted = true;
          }
        }
      }
      Swal.fire({
        icon: "info",
        title : "Se ha eliminado del carrito correctamente",
      })
    }
    localStorage.setItem('carsPurchases',JSON.stringify(this.carsPurchases));
  }

  /*Eliminar un autto*/

  public deletedCarByAdmin(carId : number){
    this.carService.deteledCarByAdmin(carId).subscribe({
      next : value => {
        Swal.fire({
          icon : "success",
          title : "Se elimino correctamente",
        });
        window.location.reload();
      },error : err => {
        Swal.fire({
          icon : "error",
          title : "No se pudo eliminar",
        });
        console.log(err)
        window.location.reload();
      }
    })
  }



}
