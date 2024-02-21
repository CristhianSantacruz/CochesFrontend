import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {environment} from "../../../environments/environment.development";
import {AuthUserDto} from "../dto/AuthUserDto";
import {AuthLoginResponseDto} from "../dto/AuthLoginResponseDto";
import {TokenService} from "./token.service";
import {RegisterDto} from "../dto/RegisterDto";
import {RegisterResponseDto} from "../dto/RegisterResponseDto";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.apiUrl

  constructor(private httpClient : HttpClient  , private tokenService : TokenService) {

  }
  public signIn(authDto:AuthUserDto): Observable<AuthLoginResponseDto> {
   return  this.httpClient.post<AuthLoginResponseDto>(`${this.baseUrl}/auth/sign-in`, authDto).pipe(
     tap(response=> {
       this.tokenService.saveToken(response.jwt);
     })
   );
  }

  public register(registerDto : RegisterDto) : Observable<RegisterResponseDto> {
    return this.httpClient.post<RegisterResponseDto>(
      `${this.baseUrl}/auth/register`,registerDto);

  }



}
