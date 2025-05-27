import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../services/wishlist.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
})
export class WishlistComponent implements OnInit {
  wishlistItems: Product[] = [];

  constructor(private wishlistService: WishlistService) {}

  ngOnInit() {
    this.wishlistService.wishlist$.subscribe(wishlist => {
      this.wishlistItems = wishlist;
    });
  }

  removeFromWishlist(productId: number) {
    this.wishlistService.deleteFromWishlist(productId);
  }
}
