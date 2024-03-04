import { Component } from '@angular/core';
import {NavbarComponent} from "../../components/navbar/navbar.component";
import {ArrayType} from "@angular/compiler";
import {PurchaseService} from "../../../../core/service/purchase.service";
import {TokenService} from "../../../../core/service/token.service";
import {HistoricalPurchaseDto} from "../../../../core/dto/HistoricalPurchaseDto";
import {PurchaseRequestDto} from "../../../../core/dto/PurchaseRequestDto";
import {CarPurchase} from "../../../../core/dto/CarPurchase";
import Swal from "sweetalert2";

@Component({
  selector: 'app-orderhistory',
  standalone: true,
  imports: [
    NavbarComponent
  ],
  templateUrl: './orderhistory.component.html',

})
export class OrderhistoryComponent {

  public historyPurchases : Array<HistoricalPurchaseDto>;
  public carPurchasesUserView : Array<CarPurchase>;

  public userName: string;
  isClickVerCoches: boolean = false;

  constructor(private purchaseService: PurchaseService, private tokenService : TokenService){
     this.purchaseService.gertAllPurchaseByIdCustomer(tokenService.getInfoToken().carId).subscribe({
       next : value => {
         console.log(tokenService.getInfoToken().carId)
         this.historyPurchases  =  value;
         for(const purchase of this.historyPurchases){
           console.log(purchase.carPurchasesResponses);
         }
       }
     })
     this.userName = this.tokenService.getInfoToken().fullname
  }

  showListCarsPurchase(carPurchasesResponses: CarPurchase[]) {
     this.carPurchasesUserView = carPurchasesResponses;
     this.toggleMenu()
  }
  public toggleMenu() {
    this.isClickVerCoches = !this.isClickVerCoches;
  }
}
