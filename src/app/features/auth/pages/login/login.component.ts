import {Component, inject} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {RouterLink,Router} from "@angular/router";
import {AuthUserDto} from "../../../../core/dto/AuthUserDto";

import {AuthService} from "../../../../core/service/auth.service";
import {TokenService} from "../../../../core/service/token.service";

import {lastValueFrom} from "rxjs";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NgOptimizedImage,
    FormsModule,
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})


export class LoginComponent {



  constructor(private router:Router) {}
  authService = inject(AuthService);
  tokenService  = inject(TokenService)


  profileForm = new FormGroup({
    emailUser: new FormControl('',
      [Validators.required,Validators.email]),
    passwordUser: new FormControl('',
      [Validators.required,Validators.maxLength(10)]),
  });

  public async signIp() {


    let dtoLogin: AuthUserDto = {
      email: this.profileForm.value.emailUser,
      password: this.profileForm.value.passwordUser
    }
    await lastValueFrom(this.authService.signIn(dtoLogin))

    console.log(this.tokenService.getToken())

    await this.router.navigateByUrl(
      "/home/products"
    )

  }
  public signUp(){
    this.router.navigateByUrl("/authentication/register")
      .then(r => console.log(r))
  }

}
