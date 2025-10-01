import { Component, input, output } from '@angular/core';
import { IProductWithQuantity } from '../../../services/products';

@Component({
  selector: 'app-cart-item',
  imports: [],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss'
})
export class CartItemComponent {

  products = input<IProductWithQuantity[]>([]);

  increment = output<IProductWithQuantity>();
  decrement = output<IProductWithQuantity>();
}