import { Injectable, signal } from '@angular/core';
import productsJson from '../../products.json'

export interface IProduct {
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
  private products = signal<IProduct[]>(
    productsJson.map((p: Omit<IProduct, 'quantity'>) => ({ ...p, quantity: 0})))

  getProducts(): IProduct[] {
    return this.products(); // retorna o array!
  }
}