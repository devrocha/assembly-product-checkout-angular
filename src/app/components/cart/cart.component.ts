import { Component, computed, inject, signal } from '@angular/core';
import { Products } from '../../../services/products';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

export interface IProductWithQuantity {
  id: number
  name: string
  price: number
  description: string
  category: string
  photo: string
  quantity: number
}
@Component({
  selector: 'app-cart',
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {

  private productService = inject(Products);

  protected products = this.productService.getProducts().map(product => ({ ...product, quantity: 0 }));

  protected cartProducts = this.productService.getCartProducts();

  protected totalCartItems = computed(() => {
    let total = 0;
    for (let product of this.cartProducts()) {
      total += product.quantity;
    }
    return total;
  });

  protected filteredProducts = signal(this.products);

  protected paginatedProducts = computed(() => {
    const startIndex = (this.currentPage() - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredProducts().slice(startIndex, endIndex);
  });

  private itemsPerPage = 25;

  private totalItems = computed(() => this.filteredProducts().length);

  protected totalPages = computed(() => (Math.ceil(this.totalItems() / this.itemsPerPage)));

  protected filterText = signal('');

  protected arrayOfPages = computed(() => {

    let pages: number[] = [];

    for (let i = 1; i <= this.totalPages(); i++) {
      pages.push(i);
    }
    return pages;
  });

  protected currentPage = signal(1);

  protected goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.update(() => page);
    }
  }

  protected incrementQuantity(product: IProductWithQuantity) {

    product.quantity++;

    this.productService.addToCart(product);
  }

  protected decrementQuantity(product: IProductWithQuantity) {
    if (product.quantity > 0) {
      product.quantity--;
    }

    this.productService.addToCart(product);

    if (product.quantity === 0) {
      this.productService.removeFromCart(product.id);
    }
  }

  protected addFilter(value: string) {
    this.filterText.update(() => value);

    const toLowerCase = this.filterText().toLowerCase();

    return this.filteredProducts.update(() => this.products.filter(p => p.name.toLowerCase().includes(toLowerCase)
      || p.category.toLowerCase().includes(toLowerCase)));
  }

}

