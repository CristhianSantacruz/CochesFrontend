import { Injectable } from '@angular/core';
import { getCookie, setCookie } from 'typescript-cookie'
@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() {

  }

  public getToken(): string {
    return  getCookie("token")
  }

  public saveToken(token: string) :void{
    setCookie("token",token,{expires :1 , path: "/authentication/"});
  }
  public deleteToken() : void {
    localStorage.removeItem("token");
  }
}
