import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
  provideHttpClient,
  withFetch,
  withInterceptors
} from "@angular/common/http";
import {authInterceptor} from "./core/interceptors/authinterceptor.interceptor";

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideHttpClient(withFetch()),
    HttpClient,
    HttpClientModule,
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
