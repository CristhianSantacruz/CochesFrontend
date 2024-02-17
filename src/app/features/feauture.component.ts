import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-feauture',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './feauture.component.html',
  styleUrl: './feauture.component.css'
})
export class FeautureComponent {
    emailUsername : string  = ''
    password : string  = ''
}
