import { Component, inject, signal, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Products as ProductsService } from '../services/products';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet], 
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private productsService = inject(ProductsService);

  currentPage = signal(1);
  itemsPerPage = 25;
  selectedCategory = signal('');

  categories = computed(() => {
    const allProducts = this.productsService.getProducts();
    const categoryList = allProducts.map(product => product.category);
    return [...new Set(categoryList)].sort();
  });

  private filteredProducts = computed(() => {
    const allProducts = this.productsService.getProducts();
    const category = this.selectedCategory();
    return category
      ? allProducts.filter(product => product.category === category)
      : allProducts;
  });

  totalPages = computed(() => {
    const totalItems = this.filteredProducts().length;
    return Math.ceil(totalItems / this.itemsPerPage);
  });

  pages = computed(() => {
    return Array.from({ length: this.totalPages() }, (_, index) => index + 1);
  });

  products = computed(() => {
    const startIndex = (this.currentPage() - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredProducts().slice(startIndex, endIndex);
  });

  onCategoryChange(category: string) {
    this.selectedCategory.set(category);
    this.currentPage.set(1);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }

  goToNextPage() {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.update(page => page + 1);
    }
  }

  goToPreviousPage() {
    this.currentPage.update(page => (page > 1 ? page - 1 : 1));
  }
}
