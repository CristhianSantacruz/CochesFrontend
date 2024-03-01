import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators,ReactiveFormsModule} from "@angular/forms";
import {InfoBasicCarComponent} from "../../components/info-basic-form/info-basic-form.component";
import {MatAccordion, MatExpansionPanel, MatExpansionPanelContent,MatExpansionPanelHeader,MatExpansionPanelTitle} from "@angular/material/expansion";
import {NavbarComponent} from "../../../home/components/navbar/navbar.component";
import {InfoMachineFormComponent} from "../../components/info-machine-form/info-machine-form.component";
import {InfoAestheticFormComponent} from "../../components/info-aesthetic-form/info-aesthetic-form.component";
import {CardDto} from "../../../../core/dto/CarDto";
import Swal from "sweetalert2";
import {CarService} from "../../../../core/service/car.service";
import {lastValueFrom} from "rxjs";

@Component({
  selector: 'app-register-car',
  standalone: true,
  imports: [
    InfoBasicCarComponent,
    ReactiveFormsModule,
    MatExpansionPanel,
    MatAccordion,
    MatExpansionPanelContent,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    NavbarComponent,
    InfoMachineFormComponent,
    InfoAestheticFormComponent
  ],
  templateUrl: './register-car.component.html',
})
export class RegisterCarComponent{

  public registerCarForm : FormGroup;

  showBasic : boolean = true;
  showMechanical : boolean = false;
  showAesthetic : boolean = false;

  carService : CarService = inject(CarService)


  constructor(private fb : FormBuilder , ) {
      this.registerCarForm = this.fb.group({
        infoBasicForm : this.fb.group({
          branCardId : ['',[Validators.required]],
          reference : ['',[Validators.required]],
          price : ['',Validators.required],
          yearModel : ['',Validators.required],
          category : ['',[Validators.required]],
          stock : ['',Validators.required],

        }),
        infoMachineForm : this.fb.group({
          horsePower : ['',[Validators.required]],
          engineDisplacement: ['',[Validators.required]],
          transmission : ['',[Validators.required]],
          fuelType : ['',[Validators.required]],
          traction: ['',[Validators.required]],
          steering : ['',[Validators.required]],
        }),
        infoAestheticForm : this.fb.group({
          color : ['',[Validators.required]],
          numberDoor :['',[Validators.required]],
          numberSeats:['',[Validators.required]],
          pathImage : ['',[Validators.required]],
        }),

      })
  }

  public async  registerCar() : Promise<void>{
      const formData  = this.registerCarForm.value;
      const formBasic = formData['infoBasicForm'];
      const formMachine = formData['infoMachineForm'];
      const formAesthetic = formData['infoAestheticForm'];

    if(!this.registerCarForm.valid) {
      // @ts-ignore
      await Swal.fire({
          icon: "error",
          title: "Opps",
          text: "Revisa bien los datos de tu registro",

      })
      this.clearForm();
      return;
    }
      let dtoRegisterCar = {
        ...formBasic,
        ...formMachine,
        ...formAesthetic,
      }

     this.carService.registerCarByAdmin(dtoRegisterCar).subscribe({
       next : value => {
         Swal.fire({
           icon: 'success',
           title : 'Registro existoso',
           text : 'Se registro correctamente el carro'
         })
       },
       error : err => {
         Swal.fire({
           icon : 'error',
           title : 'Algo ha ocurrido',
           text : 'Hubo un problema al intentar registrar el auto.'
         })
    }

     });
    this.clearForm();
      console.log("CLICKEO DEL BOTON")
      console.log("Este es el dto que se envia:",dtoRegisterCar)
    }
  // Método para limpiar el formulario
  private clearForm(): void {
    this.registerCarForm.reset();
    this.showBasicForm();
  }


  showBasicForm() : void {
    this.showBasic = true;
    this.showMechanical = false;
    this.showAesthetic = false;
  }
  showMechanicalForm():void {
    this.showBasic = false;
    this.showMechanical = true;
    this.showAesthetic = false;
  }
  showAestheticForm():void {
    this.showBasic = false;
    this.showMechanical = false;
    this.showAesthetic = true;
  }

}
