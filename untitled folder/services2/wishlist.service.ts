import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private wishlistSubject = new BehaviorSubject<Product[]>([]);
  wishlist$ = this.wishlistSubject.asObservable();

  toggleWishlist(product: Product) {
    const currentWishlist = this.wishlistSubject.value;
    const index = currentWishlist.findIndex(item => item.id === product.id);

    if (index > -1) {
      currentWishlist.splice(index, 1);
    } else {
      currentWishlist.push(product);
    }

    this.wishlistSubject.next([...currentWishlist]);
  }

  deleteFromWishlist(productId: number) {
    const updatedWishlist = this.wishlistSubject.value.filter(item => item.id !== productId);
    this.wishlistSubject.next(updatedWishlist);
  }
}
