import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Products } from '../services/products';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule , FormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  productsService = inject(Products);

  protected products = this.productsService.getProducts(); // array


  

  constructor() {
    console.log(this.products); // sem parênteses

    
  }

  filterText = '';

  page = 1;
  pageSize = 25;


get filteredProducts() {
  const filter = this.filterText.trim().toLowerCase();
  if (!filter) return this.products;
  return this.products.filter(
    p =>
      p.name.toLowerCase().includes(filter) ||
      p.category.toLowerCase().includes(filter)
  );
}

  get paginatedProducts() {
    const start = (this.page - 1) * this.pageSize;
    return this.filteredProducts.slice(start, start + this.pageSize);
  }

  nextPage() {
    if ((this.page * this.pageSize) < this.products.length) {
      this.page++;
    }
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
    }
  }
}