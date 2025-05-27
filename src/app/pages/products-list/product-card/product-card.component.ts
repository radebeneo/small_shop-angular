import { Component, Input, inject } from '@angular/core';
import { Product } from '../../../models/product.model';
import { CartService } from '../../../services/cart.service';
import { PrimaryButtonComponent } from '../../../components/primary-button/primary-button.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-card',
  imports: [PrimaryButtonComponent, CommonModule],
  template: `
    <div class="product-card bg-white shadow-md rounded-lg p-4 flex flex-col items-center relative">
  <img *ngIf="product?.thumbnail" [src]="product.thumbnail" alt="{{ product.title }}" class="w-48 h-48 object-cover rounded-md" />

  <!-- Wishlist Button -->
  <button class="absolute top-2 right-2 text-red-500 text-xl hover:text-red-600 transition-all">
    <i class="bi bi-heart-fill"></i>
  </button>

  <h3 class="text-lg font-bold mt-2">{{ product.title }}</h3>

  <!-- Rating -->
  <div class="flex items-center text-yellow-500 mt-1">
    <i class="bi bi-star-fill"></i>
    <span class="ml-1 text-sm">{{ product.rating }}</span>
  </div>

  <p class="text-sm text-gray-600 mt-2">{{ product.brand }}</p>
  <p class="text-lg font-semibold text-gray-900 mt-2">{{ product.price | currency }}</p>

  <div class="flex gap-2 mt-4">
    <button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all" (click)="addToCart()">Add to Cart</button>
    <button class="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition-all">See more...</button>
  </div>
</div>

  `,
  styles: ``,
})
export class ProductCardComponent {
  @Input() product!: Product;

  constructor(private cartService: CartService) {}

  addToCart(): void {
    this.cartService.addProduct(this.product);
  }
}
