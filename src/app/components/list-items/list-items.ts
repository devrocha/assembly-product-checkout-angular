import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Products } from '../../../services/products';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardItem } from '../card-item/card-item';

@Component({
  selector: 'app-list-items',
  imports: [CommonModule, FormsModule, CardItem],
  templateUrl: './list-items.html',
  styleUrl: './list-items.scss'
})
export class ListItems {
  productsService = inject(Products);
  router = inject(Router);

  protected products = this.productsService.getProducts(); // array


  constructor() {
    console.log(this.products);
  }

  showCart = false;
  cartProducts: { product: any, quantity: number }[] = [];

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

  increment(productId: number) {
    this.productsService.increment(productId);
    if (this.showCart) {
      this.cartProducts = this.productsService.getCartProducts();
    }
  }

  decrement(productId: number) {
    this.productsService.decrement(productId);
    if (this.showCart) {
      this.cartProducts = this.productsService.getCartProducts();
    }
  }

  get quantities() {
    // Retorna o objeto de quantidades do service
    return this.productsService.getCart();
  }

  get totalQuantity() {
    return this.productsService.getTotalQuantity();
  }

  showCartProducts() {
    this.cartProducts = this.productsService.getCartProducts();
    this.showCart = true;
  }

  goToCart() {
    this.router.navigate(['/carrinho']);
  }
}
