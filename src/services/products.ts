import { Injectable, signal } from '@angular/core';
import productsJson from '../../products.json'

interface IProduct {
  id: number
  name: string
  price: number
  description: string
  category: string
  photo: string
}

@Injectable({
  providedIn: 'root'
})
export class Products {
  private products = signal<IProduct[]>(productsJson)

  private cart = signal<{ [id: number]: number }>({});

  getCart() {
  return this.cart();
}

  getProducts() {
    return this.products(); // retorna o array!
  }

   getCartProducts() {
    const cartObj = this.cart();
    return this.getProducts()
      .filter(p => cartObj[p.id] > 0)
      .map(p => ({
        product: p,
        quantity: cartObj[p.id]
      }));
  }

  increment(productId: number) {
    const cartObj = { ...this.cart() };
    cartObj[productId] = (cartObj[productId] || 0) + 1;
    this.cart.set(cartObj);
  }

  decrement(productId: number) {
    const cartObj = { ...this.cart() };
    if ((cartObj[productId] || 0) > 0) {
      cartObj[productId]--;
      this.cart.set(cartObj);
    }
  }

  getTotalQuantity() {
    return Object.values(this.cart()).reduce((sum, q) => sum + q, 0);
  }
}