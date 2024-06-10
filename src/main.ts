import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module'; // Import AppModule
// import { environment } from './environments/environment';
import { routes } from './app/app.routes'; // Import routes

// if (environment.production) {
//   enableProdMode();
// }

platformBrowserDynamic().bootstrapModule(AppModule) // Bootstrap AppModule
  .catch(err => console.error(err));
