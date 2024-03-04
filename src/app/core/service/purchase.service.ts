import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment.development";
import {HttpClient} from "@angular/common/http";
import {PurchaseRequestDto} from "../dto/PurchaseRequestDto";
import {Observable} from "rxjs";
import {HistoricalPurchaseDto} from "../dto/HistoricalPurchaseDto";

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

   baseUrl : string = environment.apiUrl;
  constructor(private httpClient :  HttpClient) {}

  public registerPurchase(newpurchaseDto : PurchaseRequestDto) : Observable<any>{
    return this.httpClient.post(`${this.baseUrl}/purchases`,newpurchaseDto)
  }
 public gertAllPurchaseByIdCustomer(idCustomer : string) : Observable<HistoricalPurchaseDto[]>{
    return this.httpClient.get<HistoricalPurchaseDto[]>(`${this.baseUrl}/purchases/customers/${idCustomer}`)
 }
}
