import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Products } from '../services/products';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  productsService = inject(Products);

  protected products = this.productsService.getProducts(); // array


  

  constructor() {
    console.log(this.products); // sem parênteses

    
  }



    page = 1;
  pageSize = 25;

  get paginatedProducts() {
    const start = (this.page - 1) * this.pageSize;
    return this.products.slice(start, start + this.pageSize);
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