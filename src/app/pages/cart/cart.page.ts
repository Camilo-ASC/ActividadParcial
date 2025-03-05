import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  standalone: false
})
export class CartPage implements OnInit {
  cartItems: any[] = [];
  total: number = 0;

  constructor(
    private cartService: CartService,
    private toastController: ToastController,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.cartItems = this.cartService.getCartItems();
    this.calculateTotal();
  }

  changeQuantity(item: any, change: number) {
    item.quantity = Math.max(1, item.quantity + change);
    this.cartService.saveCart();
    this.loadCart(); 
  }

  calculateTotal() {
    this.total = this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  removeItem(productId: number) {
    this.cartService.removeItem(productId);
    this.loadCart(); 
    this.showToast('Producto eliminado del carrito');
  }

  async checkout() {
    this.loadCart(); 

    if (!this.cartItems || this.cartItems.length === 0) {
      this.showToast('Añade productos al carrito antes de continuar.', 'warning');
      return;
    }

    this.router.navigate(['/checkout']);
  }

  async showToast(message: string, color: string = 'danger') {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'top',
      color
    });
    await toast.present();
  }
}
