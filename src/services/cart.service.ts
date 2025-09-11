import { computed, Injectable, signal, Signal } from '@angular/core';
import { IProductQuantity } from '../app/components/home/home.component';

@Injectable({
  providedIn: 'root'
})

export class CartService {

  private cartItems = signal<IProductQuantity[]>([]);

  protected cartTotal = computed(() => {
    let total = 0;

    for (let item of this.cartItems()) {
      total = total + item.quantity;
    }

    return total;

  });

  getCartTotal() {
    return this.cartTotal;
  }

  getCartItems() {
    return this.cartItems;
  }

  addToCart(item: IProductQuantity) {

    if (this.cartItems().some(cartItem => cartItem.id === item.id)) {
      alert('Produto já está no carrinho!');
      return;
    }

    this.cartItems.set([...this.cartItems(), item]);
  }

  removeFromCart(itemId: number) {

    this.cartItems.set(this.cartItems().filter(item => item.id !== itemId));
  }
}
