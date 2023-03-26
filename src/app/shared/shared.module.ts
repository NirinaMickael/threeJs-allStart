import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { CardShopComponent } from './components/card-shop/card-shop.component';
import { ShorpingCardComponent } from './components/shorping-card/shorping-card.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    CardShopComponent,
    ShorpingCardComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports :[
    LoginComponent,
    SignupComponent,
    CardShopComponent
  ]
})
export class SharedModule { }
