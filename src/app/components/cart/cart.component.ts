import { Component, inject } from '@angular/core';
import { Products } from '../../../services/products';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {

  private productService = inject(Products);

  protected products = this.productService.getProducts();
}
