import { Component, computed, inject, signal, Signal } from '@angular/core';
import { IProduct, Products } from '../../../services/products';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../services/cart.service';

export interface IProductQuantity extends IProduct {
  quantity: number;
}

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  private productsService = inject(Products);
  private cartService = inject(CartService);

  protected productsWithQuantity = computed(() => this.productsService.getProducts().map(product => ({
    ...product,
    quantity: 0
  })).filter(product => product.name.toLowerCase().includes(this.search().toLowerCase()) ||
    product.category.toLowerCase().includes(this.search().toLowerCase())));


  protected currentPage = signal(1);
  protected itemsPerPage = signal(24);
  protected totalItems = computed(() =>
    this.productsWithQuantity().length
  );
  protected search = signal('');

  protected totalPages = computed(() =>
    Math.ceil(this.totalItems() / this.itemsPerPage())
  );

  protected pages = computed(() => {
    const pagesArray = [];
    for (let i = 1; i <= this.totalPages(); i++) {
      pagesArray.push(i);
    }
    return pagesArray;
  });


  protected products = computed(() => {
    const startIndex = (this.currentPage() - 1) * this.itemsPerPage();
    const endIndex = startIndex + this.itemsPerPage();
    const selectedProducts = this.productsWithQuantity().slice(startIndex, endIndex);
    return selectedProducts;
  });

  incrementQuantity(item: IProductQuantity) {
    item.quantity = item.quantity + 1;
  }

  decrementQuantity(item: IProductQuantity) {
    if (item.quantity > 0) {
      item.quantity = item.quantity - 1;
    }
  }

  addToCart(item: IProductQuantity) {
    this.cartService.addToCart(item);
  }

  goToPage(page: number) {
    this.currentPage.set(page);
  }

}



