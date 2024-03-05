import {Component, inject, OnInit} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";

import {RouterLink,Router} from "@angular/router";
import {AuthUserDto} from "../../../../core/dto/AuthUserDto";
import {AuthService} from "../../../../core/service/auth.service";
import {lastValueFrom} from "rxjs";
import Swal from 'sweetalert2';
import {CustomerService} from "../../../../core/service/customer.service";
import {TokenService} from "../../../../core/service/token.service";

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
export class LoginComponent  {
  public profileForm : FormGroup;
  private authLoginToken : string;
  private userName : string;
  authService:AuthService = inject(AuthService);

  constructor(private router:Router , private fb : FormBuilder,private tokenService : TokenService) {
    this.profileForm = this.fb.group({
      emailUser: ['', [Validators.required,Validators.email]],
      passwordUser: ['', [Validators.required]],
    });

  }
 public async signIp():Promise<void> {

    if(this.profileForm.valid){
      let dtoLogin: AuthUserDto = {
        email : this.profileForm.value.emailUser,
        password : this.profileForm.value.passwordUser
      }
      await lastValueFrom(this.authService.signIn(dtoLogin))
        .then(result => {
          this.authLoginToken = result.jwt;
      }).catch(err=>{
          Swal.fire({
            icon: "error",
            title: "Opps",
            text: "Revissa bien tus datos",
          });
        });
     await this.successLoginGreat();

      await this.router.navigateByUrl("/home/products")
    }else{
      await Swal.fire({
        icon: "error",
        title: "Opps",
        text: "Revisa bien tu email o password",
      });
    }
  }
  public async successLoginGreat():Promise<void>{
    this.userName = this.tokenService.getInfoToken().fullname
     await Swal.fire({
       position: "center",
       icon: "success",
       title: `Bienvenid@  ${this.userName}`,
       showConfirmButton: false,
       timer: 1500
     });

  }
  public signUp(){
    this.router.navigateByUrl("/authentication/register")
      .then(r => console.log(r))
  }

  public forgotPassword()  {
    this.router.navigateByUrl("/authentication/forgot").then();
  }
}
