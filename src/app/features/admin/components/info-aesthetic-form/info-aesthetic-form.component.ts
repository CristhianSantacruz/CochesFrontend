import {Component, OnInit} from '@angular/core';
import {ControlContainer, FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-info-aesthetic-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './info-aesthetic-form.component.html',
})
export class InfoAestheticFormComponent implements  OnInit{
  public infoAestheticForm : any;

  constructor(private controlContainer : ControlContainer) {}

  ngOnInit(): void {
    this.infoAestheticForm = this.controlContainer.control;
    this.infoAestheticForm = this.infoAestheticForm.controls["infoAestheticForm"]
  }

}
