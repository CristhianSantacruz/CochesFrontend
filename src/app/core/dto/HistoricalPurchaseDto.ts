import {CarPurchase} from "./CarPurchase";

export interface HistoricalPurchaseDto {
  cardId : string,
  carPurchasesResponses : CarPurchase[]
  date : Date
  numberBill : number
  paymentMethod:string
  total : number
}
