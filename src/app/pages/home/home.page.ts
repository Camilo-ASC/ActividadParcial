import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false
})
export class HomePage implements OnInit {
  products: any[] = [];
  categories: string[] = [];
  selectedCategory: string = '';
  searchTerm: string = '';
  cartCount: number = 0;

  constructor(
    private apiService: ApiService,
    private router: Router,
    public cartService: CartService
  ) {}

  ngOnInit() {
    this.loadProducts();
    this.loadCategories();
    this.updateCartCount();
  }

  loadProducts() {
    this.apiService.getAllProducts().subscribe(data => {
      this.products = data;
    });
  }

  loadCategories() {
    this.apiService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  filterProducts() {
    this.apiService.getAllProducts().subscribe(data => {
      this.products = data.filter(product =>
        product.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    });
  }

  onCategoryChange() {
    if (this.selectedCategory === '' || this.selectedCategory === null) {  
      this.apiService.getAllProducts().subscribe(data => {
        this.products = data;
      });
    } else {
      this.apiService.getProductsByCategory(this.selectedCategory).subscribe(data => {
        this.products = data;
      });
    }
  }

  goToProductDetails(productId: number) {
    this.router.navigate(['/product-details', productId]); 
  }

  updateCartCount() {
    this.cartService.cart$.subscribe(cart => {
      this.cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    });
  }
}
