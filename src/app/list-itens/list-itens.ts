import { Component, computed, inject, signal } from '@angular/core';
import { Products } from '../../services/products';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-itens',
  imports: [ CommonModule,FormsModule],
  standalone: true,
  templateUrl: './list-itens.html',
  styleUrl: './list-itens.scss'
})
export class ListItens {
  productsService = inject(Products);
  router = inject(Router);

  protected products = this.productsService.getProducts();

  page = signal(1);
  pageSize = 25;

  nextPage() {
    if ((this.page() * this.pageSize) < this.products().length) {
      this.page.update(p => p + 1);
    }
  }

  prevPage() {
    if (this.page() > 1) {
      this.page.update(p => p - 1);
    }
  }

  filterTerm = signal('');

  filteredProducts = computed(() => {
    const term = this.filterTerm().toLowerCase();
    if (!term) return this.products();
    return this.products().filter(p =>
      p.name.toLowerCase().includes(term) ||
      p.category?.toLowerCase().includes(term)
    );
  });

  pagedProducts = computed(() => {
    const start = (this.page() - 1) * this.pageSize;
    return this.filteredProducts().slice(start, start + this.pageSize);
  });

  addToCart(produto: any) {
    this.products.update(produtos =>
      produtos.map(p =>
        p.id === produto.id
          ? { ...p, quantity: (p.quantity || 0) + 1 }
          : p
      )
    );
  }

  removeFromCart(produto: any) {
    this.products.update(produtos =>
      produtos.map(p =>
        p.id === produto.id && p.quantity > 0
          ? { ...p, quantity: p.quantity - 1 }
          : p
      )
    );
  }

  totalQuantity = computed(() =>
    this.products().reduce((sum, p) => sum + (p['quantity'] || 0), 0)
  );
 

}
