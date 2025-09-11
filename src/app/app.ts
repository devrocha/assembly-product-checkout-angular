import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Products } from '../services/products';
import { BarComponent } from './components/bar/bar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BarComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  productsService = inject(Products)

  protected products = this.productsService.getProducts()

  constructor() {
    console.log(this.products)
  }
}
