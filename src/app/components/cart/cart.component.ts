import { Component, computed, inject, signal } from '@angular/core';
import { Products } from '../../../services/products';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {

  private productService = inject(Products);

  protected products = this.productService.getProducts();

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

  protected addFilter(value: string) {
    this.filterText.update(() => value);

    const toLowerCase = this.filterText().toLowerCase();

    return this.filteredProducts.update(() => this.products.filter(p => p.name.toLowerCase().includes(toLowerCase)
      || p.category.toLowerCase().includes(toLowerCase)));
  }
}

