import { Component, inject, signal, Signal } from '@angular/core';
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

  protected selectedProducts = this.products;

  protected paginatedProducts() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.selectedProducts.slice(startIndex, endIndex);
  }

  private itemsPerPage = 25;

  private totalItems = signal(this.selectedProducts.length);

  protected totalPages = signal(Math.ceil(this.totalItems() / this.itemsPerPage));

  protected pages: number[] = [];

  protected filterText = '';

  constructor() {
    for (let i = 1; i <= this.totalPages(); i++) {
      this.pages.push(i);
    }

  }

  protected currentPage = 1;

  protected goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage = page;
    }
  }

  protected addFilter(value: string) {
    this.filterText = value;
    this.selectedProducts = this.products.filter(p => p.name.toLowerCase().includes(this.filterText.toLowerCase())
      || p.category.toLowerCase().includes(this.filterText.toLowerCase()));
  }
}

