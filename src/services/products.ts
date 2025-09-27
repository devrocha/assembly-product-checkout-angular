import { computed, Injectable, signal } from '@angular/core';
import productsJson from '../../products.json';

export interface IProductWithQuantity {
  id: number
  name: string
  price: number
  description: string
  category: string
  photo: string
  quantity: number
}
export interface IProduct {
  id: number
  name: string
  price: number
  description: string
  category: string
  photo: string
}

@Injectable({
  providedIn: 'root'
})
export class Products {

  private products = signal<IProduct[]>(productsJson);

  private cartProducts = signal<IProductWithQuantity[]>([]);

  private text = signal('');

  private productsWithQuantity = computed(() => this.products().map(product => ({ ...product, quantity: 0 })).filter(p =>
    p.name.toLowerCase().includes(this.text()) || p.category.toLowerCase().includes(this.text())));

  getpaginatedProducts() {
    return this.paginatedProducts;
  }

  getCartProducts() {
    return this.cartProducts;
  }

  getTotalCartProducts() {
    return this.totalCartProducts;
  }

  getTotalPages() {
    return this.totalPages;
  }

  getArrayOfPages() {
    return this.arrayOfPages;
  }

  getcurrentPage() {
    return this.currentPage;
  }

  private totalCartProducts = computed(() => {
    let total = 0;
    for (let product of this.cartProducts()) {
      total += product.quantity;
    }
    return total;
  });

  private paginatedProducts = computed(() => {
    const startIndex = (this.currentPage() - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.productsWithQuantity().slice(startIndex, endIndex);
  });

  private itemsPerPage = 25;

  private totalItems = computed(() => this.productsWithQuantity().length);

  private totalPages = computed(() => (Math.ceil(this.totalItems() / this.itemsPerPage)));

  private arrayOfPages = computed(() => {

    let pages: number[] = [];

    for (let i = 1; i <= this.totalPages(); i++) {
      pages.push(i);
    }
    return pages;
  });

  private currentPage = signal(1);

  public goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }

  public incrementQuantity(product: IProductWithQuantity) {

    product.quantity++;

    if (this.cartProducts().find(p => p.id === product.id)) {

      this.cartProducts().forEach(p => {
        if (p.id === product.id) {
          p.quantity = product.quantity;
        }

      });

      this.cartProducts.set([...this.cartProducts()]);

    } else {
      this.cartProducts.set([...this.cartProducts(), product]);
    }

  }

  public decrementQuantity(product: IProductWithQuantity) {
    if (product.quantity > 0) {
      product.quantity--;

      if (this.cartProducts().find(p => p.id === product.id)) {

        this.cartProducts().forEach(p => {
          if (p.id === product.id) {
            p.quantity = product.quantity;
          }

        });

        this.cartProducts.set([...this.cartProducts()]);

      }
    }
    else {
      this.cartProducts.set([...this.cartProducts().filter(p => p.id !== product.id)]);

    }
  }

  public addFilter(filterText: string) {

    this.text.set(filterText);
  }

}


