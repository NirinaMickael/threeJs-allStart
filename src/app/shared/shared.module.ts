import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { CardShopComponent } from './components/card-shop/card-shop.component';
import { ShorpingCardComponent } from './components/shorping-card/shorping-card.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductItemsComponent } from './components/product-items/product-items.component';


@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    CardShopComponent,
    ShorpingCardComponent,
    ProductItemsComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports :[
    LoginComponent,
    SignupComponent,
    CardShopComponent,
    ShorpingCardComponent
  ]
})
export class SharedModule { }
