import { Component } from '@angular/core';
import {NavbarComponent} from "../../components/navbar/navbar.component";

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [
    NavbarComponent
  ],
  templateUrl: './inventory.component.html',
})
export class InventoryComponent {

}
