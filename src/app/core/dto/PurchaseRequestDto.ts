import {CarPurchase} from "./CarPurchase";

export interface PurchaseRequestDto {

  cardId: string ;
  date : Date;
  total: number;
  paymentMethod : string;
  carPurchases : Array<CarPurchase>;
}
