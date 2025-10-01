import { Component, inject } from '@angular/core';
import { IProductWithQuantity, Products } from '../../../services/products';

import { RouterLink } from '@angular/router';
import { CartItemComponent } from '../cart-item/cart-item.component';

@Component({
  selector: 'app-page-cart',
  imports: [RouterLink, CartItemComponent],
  templateUrl: './page-cart.component.html',
  styleUrl: './page-cart.component.scss'
})
export class PageCartComponent {


  private productsService = inject(Products);

  protected cartProducts = this.productsService.getCartProducts();

  increment(product: IProductWithQuantity) {
    this.productsService.incrementQuantity(product);
  }

  decrement(product: IProductWithQuantity) {
    this.productsService.decrementQuantity(product);
  }


}
