import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {
  cartItems: Product[] = [];
  totalCost: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.cart$.subscribe(cart => {
      this.cartItems = cart;
      this.totalCost = this.cartService.getTotalCost();
    });
  }

  removeItem(productId: number) {
    this.cartService.deleteFromCart(productId);
  }

  updateQuantity(productId: number, change: number) {
    this.cartService.updateQuantity(productId, change);
  }
}
