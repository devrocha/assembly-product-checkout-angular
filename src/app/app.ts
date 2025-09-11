import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Products } from '../services/products';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet ,CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  productsService = inject(Products)

  protected products = this.productsService.getProducts()

  constructor(){
    console.log(this.products)
  }
}
