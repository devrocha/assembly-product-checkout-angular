import { Component, input, output } from '@angular/core';
import { IProduct } from '../../../services/products';

@Component({
  selector: 'card-item',
  imports: [],
  templateUrl: './card-item.html',
  styleUrl: './card-item.scss'
})
export class CardItem {
  products = input<{ product: IProduct, quantity: number }[]>([])

  increment = output<number>()
  decrement = output<number>()
}
