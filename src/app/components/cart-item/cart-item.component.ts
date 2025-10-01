import { Component, input, output } from '@angular/core';
import { IProductWithQuantity } from '../../../services/products';

@Component({
  selector: 'app-cart-item',
  imports: [],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss'
})
export class CartItemComponent {

  product = input<IProductWithQuantity>();

  increment = output<void>();
  decrement = output<void>();
}