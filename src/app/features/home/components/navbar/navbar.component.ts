
import { Component } from '@angular/core';
import {TokenService} from "../../../../core/service/token.service";
import {removeCookie} from "typescript-cookie";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {UserDto} from "../../../../core/dto/UserDto";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {


 decodeToken : UserDto;
 public jwt : string;
 public userName : string;
 public isAdmin: boolean = false;

  constructor(private tokenService:TokenService) {;
    this.decodeToken = this.tokenService.getInfoToken()
    console.log(this.decodeToken);
    this.userName = this.decodeToken.fullname
    this.jwt = this.tokenService.getToken()
    this.tokenService.saveToken(this.jwt);
    if(this.decodeToken.rol === "ADMIN"){
      this.isAdmin = true;

    }
  }

  public signOut(){
    removeCookie("token");
  }


}
