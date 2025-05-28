import { Component, computed, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { RouterLink } from '@angular/router';
import { PrimaryButtonComponent } from '../primary-button/primary-button.component';


@Component({
  selector: 'app-header',
  imports: [PrimaryButtonComponent, RouterLink],
  template: `
    <div class="bg-white px-6 py-4 shadow-lg border-b border-gray-200 flex justify-between sticky top-0 z-50">
      <button class="text-2xl font-bold tracking-wide text-gray-800 hover:text-blue-600" routerLink="/">luminary</button>
      <div class="flex-grow flex justify-center items-center">
        <input type="text" placeholder="Search products..." class="w-1/1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        <button class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all flex items-center gap-2">
          <i class="bi bi-search"></i>
        </button>
      </div>
      <div class="flex items-center gap-4">
        <button routerLink="/wishlist" class="bg-transparent border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-100 transition-all flex items-center gap-2">
          <i class="bi bi-heart"></i>
        </button>
      
      <app-primary-button label="{{ cartLabel() }}" routerLink="/cart" />
      </div>
      
    </div>

  `,
  styles: ``,
})
export class HeaderComponent {
  cartService = inject(CartService);

  cartLabel = computed(() => `(${this.cartService.cart().length})`);
}
