import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment.development";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProjectDto} from "../dto/ProjectDto";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  baseUrl : string = environment.apiUrl

  constructor(private httpClient: HttpClient) { }

  public getAllProjects(): Observable<ProjectDto[]>{
    return this.httpClient.get<ProjectDto[]>(`${this.baseUrl}/project`);
  }

  public registerProject(projectDto : ProjectDto) : Observable<ProjectDto>{
    return this.httpClient.post<ProjectDto>(`${this.baseUrl}/project`,projectDto)
  }
}
