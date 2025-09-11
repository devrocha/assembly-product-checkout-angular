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
  filterTerm = signal('');

  filteredProducts = computed(() => {
  const term = this.filterTerm().toLowerCase();
  if (!term) return this.products;
  return this.products.filter(
    p =>
      p.name.toLowerCase().includes(term) ||
      p.category?.toLowerCase().includes(term)
  );
});
  pagedProducts = computed(() => {
  const start = (this.page() - 1) * this.pageSize;
  return this.filteredProducts().slice(start, start + this.pageSize);
});
}