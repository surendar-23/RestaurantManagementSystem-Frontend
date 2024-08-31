import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HomeComponent} from './component/home/home.component';
import {AboutUsComponent} from './component/about-us/about-us.component';
import {ContactUsComponent} from "./component/contact-us/contact-us.component";

const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'about-us', component: AboutUsComponent},
    {path: 'contact-us', component: ContactUsComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {
}

export {routes};
