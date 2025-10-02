import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Products } from '../../../services/products';
import { Router } from '@angular/router';
import { CardItem } from '../card-item/card-item';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule, CardItem],
  templateUrl: './cart.html',
  styleUrls: ['./cart.scss', '../../../app/app.scss'] // reutiliza o estilo global!
})
export class CartPage {
  productsService = inject(Products);
  router = inject(Router);

  get cartProducts() {
    return this.productsService.getCartProducts();
  }

  increment(productId: number) {
    this.productsService.increment(productId);
  }

  decrement(productId: number) {
    this.productsService.decrement(productId);
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
