import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartSubject = new BehaviorSubject<Product[]>([]);
  cart$ = this.cartSubject.asObservable();

  addToCart(product: Product) {
    const currentCart = this.cartSubject.value;
    const existingItem = currentCart.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
      currentCart.push({ ...product, quantity: 1 });
    }

    this.cartSubject.next([...currentCart]);
  }

  updateQuantity(productId: number, change: number) {
    const currentCart = this.cartSubject.value.map(item => {
      if (item.id === productId) {
        item.quantity = (item.quantity || 1) + change;
      }
      return item;
    }).filter(item => item.quantity > 0); // Remove if quantity reaches 0

    this.cartSubject.next(currentCart);
  }

  deleteFromCart(productId: number) {
    const updatedCart = this.cartSubject.value.filter(item => item.id !== productId);
    this.cartSubject.next(updatedCart);
  }

  getTotalCost(): number {
    return this.cartSubject.value.reduce((total, item) => 
      total + (item.price - (item.price * item.discountPercentage / 100)) * item.quantity, 0);
  }
}
