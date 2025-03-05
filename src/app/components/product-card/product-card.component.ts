import { Component, Input } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  standalone: false
})
export class ProductCardComponent {
  @Input() product: any; 

  constructor(private cartService: CartService, private toastController: ToastController) {}

  addToCart() {
    if (this.product) {
      this.cartService.addToCart(this.product, 1); 
      this.showToast('Producto añadido al carrito');
    }
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
}
