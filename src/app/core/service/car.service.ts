import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment.development";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CardDto} from "../dto/CarDto";

@Injectable({
  providedIn: 'root'
})
export class CarService {

  baseUrl : string = environment.apiUrl;

  constructor(private httpClient : HttpClient) { }

  public  registerCarByAdmin(registerCarDto : CardDto):Observable<CardDto> {
    return this.httpClient.post<CardDto>(`${this.baseUrl}/car`,registerCarDto)
  }

}
