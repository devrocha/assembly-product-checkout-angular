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

  getProducts() {
    return this.products()
  }
}
