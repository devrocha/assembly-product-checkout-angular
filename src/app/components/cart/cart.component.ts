import { Component, inject, signal } from '@angular/core';
import { IProductWithQuantity, Products } from '../../../services/products';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-cart',
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {


  private productsService = inject(Products);

  protected filterText = '';

  protected total = this.productsService.getTotalCartProducts();

  protected currentPage = this.productsService.getcurrentPage();

  protected arrayOfPages = this.productsService.getArrayOfPages();

  protected totalPages = this.productsService.getTotalPages();

  protected paginatedProducts = this.productsService.getpaginatedProducts();

  goToPage(page: number) {
    this.productsService.goToPage(page);
  }

  increment(product: IProductWithQuantity) {
    this.productsService.incrementQuantity(product);
  }

  decrement(product: IProductWithQuantity) {
    this.productsService.decrementQuantity(product);
  }

  addFilter(value: string) {
    this.filterText = value;

    const toLowerCase = this.filterText.toLowerCase();

    this.productsService.addFilter(this.filterText);
  }
}

