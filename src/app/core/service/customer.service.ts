import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment.development";
import {HttpClient,HttpHeaders} from "@angular/common/http";
import {RegisterDto} from "../dto/RegisterDto";
import {Observable} from "rxjs";
import {RegisterResponseDto} from "../dto/RegisterResponseDto";
import {UserDto} from "../dto/UserDto";
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
  public getCustomerByEmail(email : string,authToken : string): Observable<UserDto> {
    return this.httpClient.get<UserDto>(`${this.baseUrl}/customer/${email}`);
  }



}
