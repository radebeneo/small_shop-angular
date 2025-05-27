import { Component, computed, inject } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { ButtonComponent } from '../../../components/button/button.component';
import { PrimaryButtonComponent } from '../../../components/primary-button/primary-button.component';

@Component({
  selector: 'app-order-summary',
  imports: [PrimaryButtonComponent],
  template: `
    <div class="bg-slate-100 p-6 rounded-xl shadow-xl border">
      <h2 class="text-2xl">Order Summary</h2>
      <div class="flex flex-col gap-4">
        <div class="flex gap-4">
          <span class="text-lg">Subtotal</span>
          <span class="text-lg font-bold">{{ '$ ' + subtotal() }}</span>
        </div>
        <div class="flex gap-4">
          <span class="text-lg">Estimated Delivery & Handling</span>
          <span class="text-lg font-bold">{{ '$ ' + DELIVERY_HANDLING_FEE }}</span>
        </div>
        <div class="flex gap-4">
          <span class="text-lg">Total</span>
          <span class="text-lg font-bold">{{ '$ ' + total() }}</span>
        </div>
        <app-primary-button label="Proceed to checkout" />
      </div>
    </div>
  `,
  styles: ``,
})
export class OrderSummaryComponent {
  cartService = inject(CartService);

  readonly DELIVERY_HANDLING_FEE = 25;

  subtotal = computed(() => {
    return this.cartService.cart().reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
  });

  total = computed(() => {
    return (parseFloat(this.subtotal()) + this.DELIVERY_HANDLING_FEE).toFixed(2);
  });
}
