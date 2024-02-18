import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {environment} from "../../../environments/environment.development";
import {AuthUserDto} from "../dto/AuthUserDto";
import {AuthLoginResponseDto} from "../dto/AuthLoginResponseDto";
import {TokenService} from "./token.service";

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

  public signUp(jwt : String ){
    const observable = this.httpClient.post(`${this.baseUrl}/auth/`, jwt);

  }



}
