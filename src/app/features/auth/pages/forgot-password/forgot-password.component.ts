import { Component } from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserDtoForgot} from "../../../../core/dto/UserDto";
import {userInfo} from "node:os";
import {CustomerService} from "../../../../core/service/customer.service";
import {lastValueFrom} from "rxjs";
import {error} from "@angular/compiler-cli/src/transformers/util";
import Swal from "sweetalert2";

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    ReactiveFormsModule
  ],
  templateUrl: './forgot-password.component.html',
})
export class ForgotPasswordComponent {

  public verifyCorrect : boolean = false;

  public forgotForm : FormGroup ;
  public passwordForm: FormGroup;

  public dataForgotUser : UserDtoForgot;
  constructor(private router : Router,private fb : FormBuilder,private customerService : CustomerService) {

    this.forgotForm = this.fb.group({
      cardIdUser : ['',[Validators.required]]
    })

    this.passwordForm = this.fb.group({
      newPasswordUser : ['',[Validators.required]]
    })

  }

  public verifyUser(){
    this.customerService.getCustomerByCardId(this.forgotForm.value.cardIdUser).subscribe({
      next :  async value => {
        this.dataForgotUser = value;

        await Swal.fire({
          icon: "success",
          title: "Verificacion exitosa",
        });
        this.verifyCorrect = true;
      },error : err => {
        Swal.fire({
          icon: "error",
          title: "Opps",
          text: "Al parecer no tenemos datos de un usuario con esa cedula",
        });
      }
    })
  }

  public async updatePasswordUser() {

    let newUserData : UserDtoForgot = this.dataForgotUser;
    newUserData.password = this.passwordForm.value. newPasswordUser
    this.customerService.updateDataCustomer(this.dataForgotUser).subscribe({
      next : async value => {
        await Swal.fire({
          icon: "success",
          title: "Se ha cambiado",
          text: "Disfrute de su nueva contraseña",
        })
        this.router.navigateByUrl("/authentication/login").then()
      },error : err => {
        Swal.fire({
          icon: "error",
          title: "Opps",
          text: "Ocurrio un error al intentar cambiar la contraseña",
        });
    }
  });
  }

  public goToRegister(){
    this.router.navigateByUrl("/authentication/forgot").then()
  }
}
