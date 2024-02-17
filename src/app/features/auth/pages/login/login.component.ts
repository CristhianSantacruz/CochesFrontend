import { Component } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NgOptimizedImage,
    FormsModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  emailUsername : string  = ''
  passwordUsername : string  = ''

  constructor(private router:Router) {

  }

  public signIp(){
    alert("Inicio Sesion")
  }
  public signUp(){

  }

}
