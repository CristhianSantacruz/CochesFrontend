import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {environment} from "../environments/environment.development";
import {LoginComponent} from "./features/auth/pages/login/login.component";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title:string = 'coches-frontend';
  name: string = 'Maickel';
  constructor(){
    console.log(environment.production)
  }
}
