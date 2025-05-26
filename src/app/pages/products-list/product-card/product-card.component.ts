import { Component, Input, inject } from '@angular/core';
import { Product } from '../../../models/product.model';
import { CartService } from '../../../services/cart.service';
import { PrimaryButtonComponent } from '../../../components/primary-button/primary-button.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-card',
  imports: [PrimaryButtonComponent, CommonModule],
  template: `
    <div class="product-card">
      <img *ngIf="product?.thumbnail" [src]="product.thumbnail" alt="{{ product.title }}" />
      <!-- <div class="image-gallery" *ngIf="product?.images?.length">
        <img *ngFor="let img of product.images" [src]="img" alt="Additional images" />
      </div> -->
      <h3>{{ product.title }}</h3>
      <p>{{ product.price | currency }}</p>
      <span [ngClass]="product.stock > 0 ? 'in-stock' : 'out-of-stock'">
        {{ product.availabilityStatus }}
      </span>
      <app-primary-button (click)="addToCart()" text="Add to Cart"></app-primary-button>
    </div>
  `,
  styles: ``,
})
export class ProductCardComponent {
  @Input() product!: Product;

  constructor(private cartService: CartService) {}

  addToCart(): void {
    this.cartService.addProduct(this.product);
  }
}
