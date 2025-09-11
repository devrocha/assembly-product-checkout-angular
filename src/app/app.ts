import { Component, inject, signal, computed } from '@angular/core';
import { Products } from '../services/products';
import { CommonModule } from '@angular/common';
import { routes } from './app.routes';

@Component({
  selector: 'app-root',
  imports: [ routes , CommonModule ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  productsService = inject(Products);

  protected products = this.productsService.getProducts();

  page = signal(1);
  pageSize = 25;

  pagedProducts = computed(() => {
    const start = (this.page() - 1) * this.pageSize;
    return this.products.slice(start, start + this.pageSize);
  });

  nextPage() {
    if ((this.page() * this.pageSize) < this.products.length) {
      this.page.update(p => p + 1);
    }
  }

  prevPage() {
    if (this.page() > 1) {
      this.page.update(p => p - 1);
    }
  }
}