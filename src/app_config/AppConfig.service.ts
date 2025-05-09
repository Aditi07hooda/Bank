import { InjectionToken } from "@angular/core";
import { APP_CONFIGURATION } from './appconfig.interface';
import { environment } from "../environments/environment";

export const  APP_CONFIG_SERVICE= new InjectionToken<APP_CONFIGURATION>('app.config');

export const APP_CONFIG : APP_CONFIGURATION = {
  api: environment.api,
}