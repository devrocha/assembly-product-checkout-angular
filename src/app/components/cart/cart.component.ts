import { Component, inject, Signal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IProductQuantity } from '../home/home.component';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {

  private cartService = inject(CartService);

  protected cartItems: Signal<IProductQuantity[]> = this.cartService.getCartItems();

  removeProduct(idProduct: number) {
    this.cartService.removeFromCart(idProduct);
  }
}
