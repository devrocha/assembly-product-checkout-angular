import { Injectable, signal } from '@angular/core';
import productsJson from '../../products.json'
import { IProductWithQuantity } from '../app/components/cart/cart.component';

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

  public CartProducts = signal<IProductWithQuantity[]>([]);

  getProducts() {
    return this.products()
  }

  getCartProducts() {
    return this.CartProducts;
  }

  addToCart(product: IProductWithQuantity) {
    const cart = this.CartProducts();

    if (cart.find(p => p.id === product.id)) {

      cart.forEach(p => {
        if (p.id === product.id) {
          p.quantity = product.quantity;
        }

      });

      this.CartProducts.set([...cart]);

    } else {
      this.CartProducts.set([...cart, product]);
    }
  }

  removeFromCart(productId: number) {
    const cart = this.CartProducts();
    const updatedCart = cart.filter(product => product.id !== productId);
    this.CartProducts.update(() => updatedCart);
  }
}
