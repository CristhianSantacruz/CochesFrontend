import { Component } from '@angular/core';
import {NavbarComponent} from "../../components/navbar/navbar.component";
import {ProjectDto} from "../../../../core/dto/ProjectDto";
import {ProjectService} from "../../../../core/service/project.service";

@Component({
  selector: 'app-aboutme',
  standalone: true,
  imports: [
    NavbarComponent
  ],
  templateUrl: './aboutme.component.html',
})
export class AboutmeComponent {

  public projectsAboutme : ProjectDto[];

  constructor(private projectService : ProjectService ) {
    this.projectService.getAllProjects().subscribe({
      next : value => {
        this.projectsAboutme  = value;
      }
    })
  }

}
