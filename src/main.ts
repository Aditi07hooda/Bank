import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideStore } from '@ngrx/store';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { APP_CONFIG, APP_CONFIG_SERVICE } from './app_config/AppConfig.service';
import { environment } from './environments/environment';
import { AppReducer } from './app/reducers/app.reducer';
import { provideEffects } from '@ngrx/effects';
import { TransactionEffect } from './app/services/effects/transaction.effect';
import { AccountEffect } from './app/services/effects/account.effect';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    ...appConfig.providers,
    {
      provide: APP_CONFIG_SERVICE,
      useValue: APP_CONFIG,
    },
    provideStore(AppReducer),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: environment.production,
    }),
    provideEffects([TransactionEffect, AccountEffect])
  ],
}).catch((err) => console.error(err));
