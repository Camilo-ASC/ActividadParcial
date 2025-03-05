import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { CheckoutPageRoutingModule } from 'src/app/pages/checkout/checkout-routing.module'; 
import { CheckoutPage } from 'src/app/pages/checkout/checkout.page'; 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CheckoutPageRoutingModule
  ],
  declarations: [CheckoutPage]
})
export class CheckoutPageModule { }
