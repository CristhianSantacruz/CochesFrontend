import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {RouterLink,Router} from "@angular/router";
import {NgOptimizedImage} from "@angular/common";
import {RegisterDto} from "../../../../core/dto/RegisterDto";
import {lastValueFrom} from "rxjs";
import {AuthService} from "../../../../core/service/auth.service";
import Swal from "sweetalert2";
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    NgOptimizedImage
  ],
  templateUrl: './register.component.html',
})
export class RegisterComponent {

  userDataForm : FormGroup;
  registered : boolean = false;
  userNameResultRegister : string;


  constructor(private router:Router, private authService : AuthService,private fb: FormBuilder) {
    this.userDataForm = this.fb.group({
      nameUsername : ['',[Validators.required]],
      lastNameUsername:['',[]],
      emailUsername : ['',[ Validators.required,Validators.email]],
      dniUsername : ['',[Validators.required, Validators.maxLength(10),Validators.minLength(10)]],
      phoneUsername :['',[Validators.required, Validators.maxLength(10),Validators.minLength(10)]],
      passwordUsername : ['',[Validators.required]]
    })

  }

  public async  register(): Promise<void>{
    let registerDataDto : RegisterDto = {
      email : this.userDataForm.value.emailUsername,
      cardId : this.userDataForm.value.dniUsername,
      phone : this.userDataForm.value.phoneUsername,
      fullName : this.userDataForm.value.nameUsername + " " +this.userDataForm.value.lastNameUsername,
      password : this.userDataForm.value.passwordUsername

    }
    console.log("USEARIO REGISTRADO DATOS",registerDataDto)
    if(this.userDataForm.valid){
       await lastValueFrom(this.authService.register(registerDataDto)).then(value => {
         this.userNameResultRegister = value.userName;
       })
      this.registered = true;
    }else{
      console.log("Error  de registro")
      await Swal.fire({
        icon: "error",
        title: "Opps",
        text: "Algo salio mal en el Formulario",
      });
    }
  }
  public signIn(){
     this.router.navigateByUrl("/home/products");
  }

}
