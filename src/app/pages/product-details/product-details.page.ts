import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';
import { ToastController } from '@ionic/angular';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
  standalone: false
})
export class ProductDetailsPage implements OnInit {
  product: any = {};
  quantity: number = 1;
  cartCount: number = 0; 

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    public cartService: CartService, 
    private toastController: ToastController,
    private location: Location
  ) {}

  ngOnInit() {
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    if (!isNaN(productId) && productId > 0) {
      this.apiService.getProductById(productId).subscribe(data => {
        this.product = data;
      });
    }

    
    this.cartService.cart$.subscribe(cart => {
      this.cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    });
  }

  increaseQuantity() {
    this.quantity++;
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart() {
    this.cartService.addToCart(this.product, this.quantity);
    this.showToast('Producto añadido al carrito');
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'top',
      color: 'success'
    });
    await toast.present();
  }

  goBack() {
    this.location.back();
  }
}
