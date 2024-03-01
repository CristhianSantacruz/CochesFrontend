import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {FormsModule,ReactiveFormsModule} from "@angular/forms";
import {
  HttpClient,
  HttpClientModule,
  provideHttpClient,
  withInterceptors
} from "@angular/common/http";
import { provideClientHydration } from '@angular/platform-browser';
import {authInterceptor} from "./core/interceptors/authinterceptor.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    FormsModule,
    ReactiveFormsModule,
    provideClientHydration(),
    HttpClient,
    HttpClientModule,
    provideHttpClient(withInterceptors([authInterceptor])),
  ]
};
