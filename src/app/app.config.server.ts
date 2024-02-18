import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import {HttpClient, provideHttpClient} from "@angular/common/http";

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideHttpClient(),
    HttpClient
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
