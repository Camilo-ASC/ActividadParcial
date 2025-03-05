import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { CartService } from 'src/app/services/cart.service';
import { NavController } from '@ionic/angular';

interface Customer {
  name: string;
  email: string;
  address: string;
}

interface PurchasedItem {
  title: string;
  image: string;
  quantity: number;
  price: number;
}

@Component({
  selector: 'app-summary',
  templateUrl: './summary.page.html',
  styleUrls: ['./summary.page.scss'],
  standalone: false
})
export class SummaryPage implements OnInit {
  customer: Customer = { name: '', email: '', address: '' };
  purchasedItems: PurchasedItem[] = [];
  total: number = 0;

  constructor(
    private navCtrl: NavController,
    private router: Router, 
    private cartService: CartService,
    private toastController: ToastController 
  ) {}

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.customer = navigation.extras.state['customer'] as Customer;
      this.purchasedItems = navigation.extras.state['purchasedItems'] as PurchasedItem[];
      this.total = navigation.extras.state['total'] as number || 
                   this.purchasedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      
      this.showPaymentSuccessToast(); 
    } else {
      this.router.navigate(['/home']); 
    }
  }

  async showPaymentSuccessToast() {
    const toast = await this.toastController.create({
      message: 'Pago realizado correctamente ✅',
      duration: 2000,
      position: 'top',
      color: 'success',
    });
    await toast.present();
  }

  goToHome() {
    this.cartService.clearCart(); 
    this.navCtrl.navigateRoot('/home', { animated: true, animationDirection: 'forward' });
  }
}
