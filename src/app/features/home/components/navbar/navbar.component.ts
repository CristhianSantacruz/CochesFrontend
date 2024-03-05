
import { Component } from '@angular/core';
import {TokenService} from "../../../../core/service/token.service";
import {removeCookie} from "typescript-cookie";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {UserDto} from "../../../../core/dto/UserDto";
import Swal from "sweetalert2";
import {createWebpackLoggingCallback} from "@angular-devkit/build-angular/src/tools/webpack/utils/stats";

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

 public menuClicked : boolean = false;

 decodeToken : UserDto;
 public jwt : string;
 public userName : string;
 public isAdmin: boolean = false;

  constructor(private tokenService:TokenService,private router:Router) {;
    this.decodeToken = this.tokenService.getInfoToken()
    this.userName = this.decodeToken.fullname
    this.jwt = this.tokenService.getToken()
    this.tokenService.saveToken(this.jwt);
    if(this.decodeToken.rol === "ADMIN"){
      this.isAdmin = true;

    }
  }

  public signOut(){
    removeCookie("token");
    localStorage.clear();
    this.router.navigateByUrl("/authentication/login").then(
      value => {
        Swal.fire({
            icon : "success",
            title : "Hasta Luego",
            text : `Nos vemos pronto ${this.userName}`
        })
      }
    );
  }

  public toggleMenu() {
    this.menuClicked = !this.menuClicked;
  }


}
