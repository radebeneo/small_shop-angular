import { Injectable, signal } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart = signal<Product[]>([]);

  addProduct(product: Product): void {
  this.cart.update((cart) => [...cart, product]); // ✅ Adds a new product to the cart

}


  removeFromCart(product: Product) {
    this.cart.set(this.cart().filter((p) => p.id !== product.id));
  }
}
