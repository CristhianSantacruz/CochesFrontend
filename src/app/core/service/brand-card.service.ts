import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment.development";
import {Observable} from "rxjs";
import {BrandCarDto} from "../dto/BrandCarDto";
import {TokenService} from "./token.service";

@Injectable({
  providedIn: 'root'
})
export class BrandCardService {
   baseUrl : string = environment.apiUrl;

  constructor(private httpClient : HttpClient) { }

  public getAllBrandCars() : Observable<BrandCarDto[]>{
    return this.httpClient.get<BrandCarDto[]>(`${this.baseUrl}/marca `)
  }
}
