import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 

const routes: Routes = [
  { path: '', redirectTo: 'splash-screen', pathMatch: 'full' },
  { path: 'splash-screen', loadChildren: () => import('./pages/splash-screen/splash-screen.module').then(m => m.SplashScreenPageModule) },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule) },
  { path: 'product-details/:id', loadChildren: () => import('./pages/product-details/product-details.module').then(m => m.ProductDetailsPageModule) },
  { path: 'cart', loadChildren: () => import('./pages/cart/cart.module').then(m => m.CartPageModule) },
  { path: 'checkout', loadChildren: () => import('./pages/checkout/checkout.module').then(m => m.CheckoutPageModule) },
  { path: 'summary', loadChildren: () => import('./pages/summary/summary.module').then(m => m.SummaryPageModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
