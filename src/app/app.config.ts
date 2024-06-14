import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { PreloadAllModules, provideRouter, withHashLocation, withPreloading, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideServiceWorker } from '@angular/service-worker';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withHashLocation(), withViewTransitions()), importProvidersFrom(HttpClientModule), provideAnimations(), provideServiceWorker('ngsw-worker.js', {
        enabled: !isDevMode(),
        registrationStrategy: 'registerWhenStable:30000'
    })]
};
