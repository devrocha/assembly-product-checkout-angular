import { Component, input, output } from '@angular/core';
import { IProduct } from '../../../services/products';

@Component({
  selector: 'card-item',
  imports: [],
  templateUrl: './card-item.html',
  styleUrl: './card-item.scss'
})
export class CardItem {
  products = input<IProduct[]>([])

  increment = output<number>()
  decrement = output<number>()

  outputEmit(id: number){
    this.increment.emit(id)
    this.decrement.emit(id)
  }
}
