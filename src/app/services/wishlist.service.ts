import { Injectable, signal } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  wishlist = signal<Product[]>([]);

  toggleWishlist(product: Product) {
    this.wishlist.update((wishlist) =>
      wishlist.some((p) => p.id === product.id)
        ? wishlist.filter((p) => p.id !== product.id) // Remove
        : [...wishlist, product] // Add
    );
  }

  isInWishlist(product: Product): boolean {
    return this.wishlist().some((p) => p.id === product.id);
  }
}
