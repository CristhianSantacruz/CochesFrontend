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
  customerService : CustomerService  = inject(CustomerService);
  constructor(private router:Router , private fb : FormBuilder) {
    this.profileForm = this.fb.group({
      emailUser: ['',
        [Validators.required,Validators.email]],
      passwordUser: ['',
        [Validators.required,Validators.maxLength(10),Validators.minLength(10)]],
    });

  }
 public async signIp():Promise<void> {

    if(this.profileForm.valid){
      let dtoLogin: AuthUserDto = {
        email : this.profileForm.value.emailUser,
        password : this.profileForm.value.passwordUser
      }
      await lastValueFrom(this.authService.signIn(dtoLogin)).then(result => {
        console.log(result)
          this.authLoginToken = result.jwt;
      })
      await this.successLoginGreat(dtoLogin.email, this.authLoginToken);


      await this.router.navigateByUrl(
        "/home/products"
      )
    }else{
      await Swal.fire({
        icon: "error",
        title: "Opps",
        text: "Revisa bien tu email o password",
      });
    }
  }
  public async successLoginGreat(email:string,token: string):Promise<void>{

     await lastValueFrom(this.customerService.getCustomerByEmail(email,token)).then(
       result => {
         this.userName = result.fullName;
         console.log(this.userName)
         console.log(result)
       }
     )
     await Swal.fire({
       position: "top-end",
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
}
