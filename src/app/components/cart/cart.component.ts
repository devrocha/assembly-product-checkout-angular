import { Component, inject } from '@angular/core';
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

  private itemsPerPage = 25;

  private totalItems = this.products.length;

  protected totalPages = Math.ceil(this.products.length / this.itemsPerPage);
  protected pages: number[] = [];

  constructor() {
    for (let i = 1; i <= this.totalPages; i++) {
      this.pages.push(i);
    }

  }

  protected currentPage = 1;


  protected paginatedProducts() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.products.slice(startIndex, endIndex);
  }

  protected goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
}

