import {Component, OnInit} from '@angular/core';
import {ControlContainer, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrandCardService} from "../../../../core/service/brand-card.service";

@Component({
  selector: 'app-info-machine-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './info-machine-form.component.html',

})
export class InfoMachineFormComponent  implements OnInit{
 public infoMachineForm : any;

  constructor(private controlContainer : ControlContainer, private brandCarService : BrandCardService) {

  }

  ngOnInit(): void {
   this.infoMachineForm = this.controlContainer.control;
   this.infoMachineForm = this.infoMachineForm.controls["infoMachineForm"]
  }


}
