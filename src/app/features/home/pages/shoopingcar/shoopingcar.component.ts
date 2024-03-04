import {Component} from '@angular/core';
import {NavbarComponent} from "../../components/navbar/navbar.component";
import {CarPurchase} from "../../../../core/dto/CarPurchase";
import {PurchaseRequestDto} from "../../../../core/dto/PurchaseRequestDto";
import {TokenService} from "../../../../core/service/token.service";
import {PurchaseService} from "../../../../core/service/purchase.service";
import {UserDto} from "../../../../core/dto/UserDto";
import {Router} from "@angular/router";

@Component({
  selector: 'app-shoopingcar',
  standalone: true,
  imports: [
    NavbarComponent
  ],
  templateUrl: './shoopingcar.component.html',
})
export class ShoopingcarComponent {

  public totalPrice : number  = 0;

  public listCarsPurchase : Array<CarPurchase>;

  //Datos de factura
  public numberBill : string;
  public datePurchase : Date;
  public userName : string;
  public userPhone : string;
  public userEmail : string;


  public purchasesSave : boolean = false;
  public decodeToken : UserDto;
  public shoppingEmpty : boolean = true;

  constructor(private tokenService : TokenService,private purchaseService :PurchaseService,private router : Router) {

    let decodeToken:UserDto = tokenService.getInfoToken();
    this.userName = decodeToken.fullname;
    this.userPhone = decodeToken.numberCellPhone;
    this.userEmail = decodeToken.email;

    this.listCarsPurchase = JSON.parse(localStorage.getItem("carsPurchases"))
    if(this.listCarsPurchase == null){
      this.shoppingEmpty = false;
      return;
    }

      for (const car of this.listCarsPurchase) {
        this.totalPrice += car.total;
      }

  }

  /*Registrar una compra*/
  public async registerPurchase() {
    this.decodeToken = this.tokenService.getInfoToken()
    console.log("Decode token en register",this.decodeToken);
    let newPurchase : PurchaseRequestDto = {
       cardId : this.decodeToken.carId,
       date : new Date(Date.now()),
       carPurchases : this.listCarsPurchase,
      paymentMethod : "Credito",
      total : this.totalPrice
    }
    this.datePurchase = newPurchase.date;
    this.purchaseService.registerPurchase(newPurchase).subscribe({
        next: value => {
          console.log(newPurchase);
          this.numberBill = value.numberBill + '-' + this.generarCodigoFactura();
          this.purchasesSave = true;
          localStorage.clear();
        }
      }
    )
  }
  printPage(){
    window.print()
  }

  public goHomeProducts(){
    this.router.navigateByUrl("/home/products");
  }

  public  generarCodigoFactura(): string {
    return Array(10).fill(0).map(() => {
      const caracteres = 'abcdefghijklmnopqrstuvwxyz0123456789';
      return caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }).join('');
  }

  public cancelarCompra() {
    localStorage.clear()
    window.location.reload()
  }

}
