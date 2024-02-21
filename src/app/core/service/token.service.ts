import { Injectable } from '@angular/core';
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private cookService : CookieService) {

  }

  public getToken(): string {
    return  this.cookService.get("token")
  }

  public saveToken(token: string) :void{
    this.cookService.set("token",token);
  }
  public deleteToken() : void {
    localStorage.removeItem("token");
  }
}
