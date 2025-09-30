import { Injectable, signal } from '@angular/core';
import productsJson from '../../products.json'


interface IProduct {
[x: string]: any;
  id: number
  name: string
  price: number
  description: string
  category: string
  photo: string
  quantity: number
}

@Injectable({
  providedIn: 'root'
})
export class Products {
  private products = signal<IProduct[]>(productsJson.map(p => ({ ...p, quantity: 0 })));

  getProducts() {
    return this.products;
  }
  getCartProducts() {
  return this.products().filter(p => p.quantity > 0);
}
}

