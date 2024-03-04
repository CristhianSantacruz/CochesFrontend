import { Injectable } from '@angular/core';
import {jwtDecode, JwtPayload} from "jwt-decode";
import {UserDto} from "../dto/UserDto";
import {getCookie,setCookie} from "typescript-cookie";


@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() {}

  public getToken(): string {
    return  getCookie("token");
  }

  public saveToken(token: string) :void{
    setCookie("token",token);
  }
  public getInfoToken(): UserDto{
    const decode =  jwtDecode(this.getToken());
    console.log(this.getToken())
    console.log(decode)
    return <UserDto>decode;
  }
  public deleteToken() : void {
    localStorage.removeItem("token");
  }

}
