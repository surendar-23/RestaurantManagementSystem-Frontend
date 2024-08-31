import {bootstrapApplication} from '@angular/platform-browser';
import {provideRouter} from '@angular/router';
import {provideHttpClient} from '@angular/common/http';

// Import your standalone components
import {AppComponent} from './app/app.component';

// Import routes from your routing module
import {routes} from './app/app-routing.module';

bootstrapApplication(AppComponent, {
    providers: [
        provideRouter(routes),
        provideHttpClient()
    ]
}).catch(err => console.error(err));
