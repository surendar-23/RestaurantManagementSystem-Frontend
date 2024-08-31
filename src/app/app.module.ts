import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AboutUsComponent} from './component/about-us/about-us.component';
import {HomeComponent} from './component/home/home.component';
import {AppHeaderComponent} from './component/app-header/app-header.component';
import {ContactUsComponent} from './component/contact-us/contact-us.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';

import {FooterComponent} from './footer/footer.component';
import {DatePipe} from '@angular/common';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {
    MAT_DIALOG_DATA,
    MatDialog,
    MatDialogModule,
} from '@angular/material/dialog';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {OwnerService} from './component/owner.service';

@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        MatIconModule,
        MatMenuModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatSnackBarModule,
        MatRippleModule,
        MatNativeDateModule,
        MatInputModule,
        MatDialogModule,
        MatIconModule,
        MatButtonToggleModule,
        AppComponent,
        AppHeaderComponent,
        HomeComponent,
        AboutUsComponent,
        ContactUsComponent,
        FooterComponent
    ],
    providers: [
        DatePipe,
        OwnerService,
        MatDialog,
        {
            provide: MAT_DIALOG_DATA,
            useValue: {}
        }
    ]
})
export class AppModule {
}

