import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterLink,Router} from "@angular/router";
import {NgOptimizedImage} from "@angular/common";

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
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  nameUsername =  ''
  lastNameUsername : string = ''
  emailUsername = ''
  passwordUsername = ''
  dniUsername = ''
  phoneUsername = ''
  constructor(private router:Router) {
  }
  public signIn(){
    this.router.navigateByUrl("/authentication/login")
      .then(r => console.log(r))
  }

}
