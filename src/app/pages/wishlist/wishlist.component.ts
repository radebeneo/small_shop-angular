import { Component, inject, ViewChild } from '@angular/core';
import { Product } from '../../models/product.model';
import { WishlistService } from '../../services/wishlist.service';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { NotificationBannerComponent } from '../../components/notification/notification-banner.component';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, NotificationBannerComponent],
  template: `
  <app-notification-banner #banner></app-notification-banner>
    <div class="p-6">
      <h2 class="text-2xl font-bold mb-4">Your Wishlist</h2>
        <div *ngIf="wishlist().length === 0" class="text-gray-600">Your wishlist is empty.</div>
        
            <div *ngFor="let product of wishlist()" class="p-4 rounded-lg">
                <div class="bg-white shadow-md border rounded-xl p-6 flex gap-4 items-center">
                    <img [src]="product.thumbnail" class="w-[50px] h-[50px] object-contain" />
                <div class="flex justify-between gap-5">
                    <h3 class="font-semibold">Brand: {{ product.brand }}</h3>
                    <h3 class="font-semibold">Product: {{ product.title }}</h3>
                    <p class="text-gray-500">Price: $ {{ product.price }}</p>
                    <p class="text-gray-800">Status:  {{ product.availabilityStatus }}</p>
                </div>

                <div class="flex gap-2 mt-4">
                    <button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all active:scale-90" (click)="addToCart(product)">
                    <i class="bi bi-bag-fill"></i> Add to Cart
                    </button>
                </div>
                
                <div class="flex-1"></div>
                <div class="flex">
                <button (click)="removeFromWishlist(product)" class="text-black w-full px-5 py-2 rounded-xl shadow-md hover:hover:bg-red-500 hover:text-white transition-all">Remove</button>
                </div>
                
            </div>
        </div>
    </div>
  `,
})
export class WishlistComponent {
  wishlistService = inject(WishlistService);
  cartService = inject(CartService);
  wishlist = this.wishlistService.wishlist;

  @ViewChild(NotificationBannerComponent) banner!: NotificationBannerComponent;

  removeFromWishlist(product: Product) {
    this.wishlistService.toggleWishlist(product);
  }

  addToCart(product: Product) {
    if (!this.banner) {
        console.error('Banner component not found!');
        return;
      }
    if (this.cartService.isProductInCart(product)) {
      this.banner.showBanner('Item already in cart!', true);
      return;
    }

    this.banner.showBanner(`You added ${product.title} to your shopping cart!`, false);
    setTimeout(() => this.cartService.addProduct(product), 0);
  }
}
