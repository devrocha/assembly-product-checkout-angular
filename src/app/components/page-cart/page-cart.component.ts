import { Component, inject } from '@angular/core';
import { Products } from '../../../services/products';
import { IProductWithQuantity } from '../cart/cart.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-page-cart',
  imports: [RouterLink],
  templateUrl: './page-cart.component.html',
  styleUrl: './page-cart.component.scss'
})
export class PageCartComponent {


  private productService = inject(Products);
  protected cartProducts = this.productService.getCartProducts();

  protected incrementQuantity(product: IProductWithQuantity) {

    product.quantity++;

    this.productService.addToCart(product);
  }

  protected decrementQuantity(product: IProductWithQuantity) {
    if (product.quantity > 0) {
      product.quantity--;
    }

    this.productService.addToCart(product);

    if (product.quantity === 0) {
      this.productService.removeFromCart(product.id);
    }
  }
}
