import { Injectable, signal } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart = signal<Product[]>([]);

  isProductInCart(product: Product): boolean {
    return this.cart().some(cartItem => cartItem.id === product.id);
  }

  addProduct(product: Product): void {
 
  const existingProduct = this.cart().find((p) => p.id === product.id);

    this.cart.update((cart) =>
      existingProduct
        ? cart.map((p) =>
            p.id === product.id ? p.quantity < p.maximumOrderQuantity
        ? { ...p, quantity: p.quantity + 1 }
        : (alert(`Maximum quantity of ${p.maximumOrderQuantity} reached.`), p)
      : p
          )
        : [...cart, { ...product, quantity: 1 }]
    );

}


  removeFromCart(product: Product) {
    this.cart.set(this.cart().filter((p) => p.id !== product.id));
  }

  incrementQuantity(product: Product) {
    this.cart.update((cart) =>
      cart.map((p) =>
        p.id === product.id ? p.quantity < p.maximumOrderQuantity
    ? { ...p, quantity: p.quantity + 1 }
    : (alert(`Maximum quantity of ${p.maximumOrderQuantity} reached.`), p)
  : p
)
    );
  }

  decrementQuantity(product: Product) {
    this.cart.update((cart) =>
      cart.map((p) =>
        p.id === product.id
          ? { ...p, quantity: Math.max(p.quantity - 1, 1) }
          : p
      )
    );
  }
}
