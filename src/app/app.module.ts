import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {
  MatInputModule,
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatCardModule,
  MatExpansionModule,
  MatProgressSpinnerModule,
  MatSelectModule
} from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import {FormsModule} from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import {RegistrationService} from './services/registration.service';
import {CommonService} from './services/common.service';
import {AuthService} from './services/auth.service';
import { httpInterceptorProviders } from './interceptors/http-interceptor-providers';
// components
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HeaderComponent } from './header/header.component';
import { MenuListComponent } from './menu/menu-list/menu-list.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { FooterComponent } from './footer/footer.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { AddItemComponent } from './menu/add-item/add-item.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HeaderComponent,
    MenuListComponent,
    LandingComponent,
    LoginComponent,
    RegistrationComponent,
    FooterComponent,
    ContactUsComponent,
    CheckoutComponent,
    AboutUsComponent,
    AddItemComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatInputModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    HttpClientModule,
    FormsModule,
    MatExpansionModule,
    MatSelectModule,
    MatProgressSpinnerModule
  ],
  providers: [
    httpInterceptorProviders,
    AuthService,
    RegistrationService,
    CommonService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
