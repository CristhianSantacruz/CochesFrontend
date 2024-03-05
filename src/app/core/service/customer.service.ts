import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment.development";
import {HttpClient,HttpHeaders} from "@angular/common/http";
import {RegisterDto} from "../dto/RegisterDto";
import {Observable} from "rxjs";
import {RegisterResponseDto} from "../dto/RegisterResponseDto";
import {UserDto, UserDtoForgot} from "../dto/UserDto";
import {TokenService} from "./token.service";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  constructor(private httpClient: HttpClient,) { }

  private baseUrl = environment.apiUrl;


  public register(userDto : RegisterDto) : Observable<RegisterResponseDto> {
    return this.httpClient.post<RegisterResponseDto>(
      `${this.baseUrl}/customer`,userDto);

  }
  public getCustomerByEmail(email : string): Observable<UserDto> {
    return this.httpClient.get<UserDto>(`${this.baseUrl}/customer/${email}`);
  }

  public getCustomerByCardId(cardId : string ): Observable<UserDtoForgot> {
    return this.httpClient.get<UserDtoForgot>(`${this.baseUrl}/customer/id/${cardId}`);
  }

  public updateDataCustomer(newUserData : UserDtoForgot) : Observable<UserDtoForgot> {
    return this.httpClient.put<UserDtoForgot>(`${this.baseUrl}/customer/update`,newUserData);
  }



}
