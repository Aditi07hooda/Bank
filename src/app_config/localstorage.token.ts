import { InjectionToken } from '@angular/core';

export const LocalStorageToken = new InjectionToken<any>('LocalStorageToken', {
  providedIn: 'root',
  factory() {
    return localStorage;
  },
});
