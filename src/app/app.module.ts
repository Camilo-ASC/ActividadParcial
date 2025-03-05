import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HomePageModule } from './pages/home/home.module';
import { ProductDetailsPageModule } from './pages/product-details/product-details.module';
import { CartPageModule } from './pages/cart/cart.module';
import { CheckoutPageModule } from './pages/checkout/checkout.module';
import { SummaryPageModule } from './pages/summary/summary.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    HomePageModule,
    ProductDetailsPageModule,
    CartPageModule,
    CheckoutPageModule,
    SummaryPageModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule { }
