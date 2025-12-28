import { provideHttpClient, withFetch } from '@angular/common/http';
import {
  ApplicationConfig,
  importProvidersFrom,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { LucideAngularModule, Paperclip, Plus, Smile } from 'lucide-angular';
import { routes } from './app.routes';
import { UserStore } from './core/user/user.store';

function initializeApp() {
  const userStore = inject(UserStore);
  userStore.loadCurrentUser();
  return;
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    importProvidersFrom(LucideAngularModule.pick({ Plus, Smile, Paperclip })),
    provideAppInitializer(initializeApp),
  ],
};
