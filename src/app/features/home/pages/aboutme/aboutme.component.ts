import { Component } from '@angular/core';
import {NavbarComponent} from "../../components/navbar/navbar.component";
import {ProjectDto} from "../../../../core/dto/ProjectDto";
import {ProjectService} from "../../../../core/service/project.service";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {lastValueFrom} from "rxjs";
import Swal from "sweetalert2";
import {Router} from "@angular/router";
import {TokenService} from "../../../../core/service/token.service";

@Component({
  selector: 'app-aboutme',
  standalone: true,
  imports: [
    NavbarComponent,
    ReactiveFormsModule
  ],
  templateUrl: './aboutme.component.html',
})
export class AboutmeComponent {

  public projectsAboutme : ProjectDto[];
  public isClickedSaveProject : boolean = false;
  public isAdmin : boolean= false;

  public projectForm : FormGroup;

  constructor(private projectService : ProjectService,private fb : FormBuilder ,private router : Router,private tokenService : TokenService) {

    if(this.tokenService.getInfoToken().rol=="ADMIN") this.isAdmin = true;

    this.projectService.getAllProjects().subscribe({
      next : value => {
        this.projectsAboutme  = value;
      }
    })

    this.projectForm = this.fb.group({
      title : ['',Validators.required],
      year : ['',Validators.required],
      description : ['',Validators.required],
      urlGithubFrontend : [''],
      urlGithubBackend  : ['']
    })
  }

  public toggleSaveProject(){
    this.isClickedSaveProject = true;
  }

  public  registerProject(){
    if(this.projectForm.valid){
      let projectDto: ProjectDto = {
         title : this.projectForm.value.title,
         year : this.projectForm.value.year,
         description : this.projectForm.value.description,
        urlGithubFrontend : this.projectForm.value. urlGithubFrontend,
        urlGithubBackend : this.projectForm.value.urlGithubBackend
      }
   this.projectService.registerProject(projectDto).subscribe({
        next :  value => {
          Swal.fire({
            icon: 'success',
            title: 'Registro existoso',
            text: 'Se registro correctamente el proyecto'
          })
         this.isClickedSaveProject = false;
        },
        error : err => {
          Swal.fire({
            icon : 'error',
            title : 'Algo ha ocurrido',
            text : 'Hubo un problema al intentar registrar el proyecto.'
          })
        }
      })
    }

  }

}
