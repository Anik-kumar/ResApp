import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth.guard';

import { MenuListComponent } from './menu/menu-list/menu-list.component';
import { HomeComponent } from './home/home.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { FooterComponent } from './footer/footer.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { AddItemComponent } from './menu/add-item/add-item.component';



const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'reg', component: RegistrationComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'contact', component: ContactUsComponent },
  { path: 'add/item', component: AddItemComponent },
  { path: 'about', component: AboutUsComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'menu', component: MenuListComponent, canActivate: [AuthGuard] },
  // { path: 'about', component: AboutUsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
