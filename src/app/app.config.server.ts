import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import {HttpClient, provideHttpClient, withFetch} from "@angular/common/http";

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideHttpClient(withFetch()),
    HttpClient
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
