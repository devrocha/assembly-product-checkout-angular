import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Products } from '../services/products';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  productsService = inject(Products)

  // Controle de paginação
  currentPage = signal(1); // Página atual
  itemsPerPage = 25; // Número de itens por página

  // Produtos filtrados com base na página atual
  protected products = this.getPaginatedProducts();

  // Método para obter os produtos da página atual
  getPaginatedProducts() {
    const startIndex = (this.currentPage() - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.productsService.getProducts().slice(startIndex, endIndex);
  }

  // Ir para a próxima página
  goToNextPage() {
    this.currentPage.update(value => value + 1);
    this.products = this.getPaginatedProducts();
  }

  // Voltar para a página anterior
  goToPreviousPage() {
    if (this.currentPage() > 1) {
      this.currentPage.update(value => value - 1);
      this.products = this.getPaginatedProducts();
    }
  }

  // goToNextPage() {
  //     this.display.update(value => value + 25); // Incrementa o idMax em 25
  //     this.products = this.productsService.getProducts().filter(product => product.id <= this.display());
  //   }

  constructor(){
    console.log(this.products)
  }
}
