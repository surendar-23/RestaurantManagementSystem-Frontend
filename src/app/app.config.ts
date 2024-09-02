import {provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';

provideZoneChangeDetection({eventCoalescing: true});
provideRouter(routes);
