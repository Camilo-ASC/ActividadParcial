import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailsPage } from './product-details.page';

const routes: Routes = [
  { path: '', component: ProductDetailsPage }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductDetailsPageRoutingModule { }
