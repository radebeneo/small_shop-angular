import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ProductCardComponent } from "./product-card/product-card.component";
import { Product } from '../../models/product.model';


@Component({
  selector: 'app-products-list',
  template: `
    <div class="p-8 grid grid-cols-3 gap-4">
      @for (product of products; track product.id) {
        <app-product-card [product]="product" />
      }
    </div>
  `,
  imports: [ProductCardComponent],
})
export class ProductsListComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data) => {
      console.log('Fetched products:', data);
      this.products = data;
    },
    (error) => console.error('Error fetching products:', error)
  );
  }
}
