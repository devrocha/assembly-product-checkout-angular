import { Component, ElementRef, HostListener, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Products } from '../services/products';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule , FormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  productsService = inject(Products);

  protected products = this.productsService.getProducts().map(p =>({...p, quantity: 0})); // array


  

  constructor() {
    console.log(this.products); // sem parênteses 
  }

  constructor(private elementRef: ElementRef){}
  
  filterText = '';

  page = 1;
  pageSize = 25;

  showcart = false;

  toggleCartDropdown(){
    this.showcart= !this.showcart;
  }

  @HostListener('document:click',['$event'])
  onDocumentClick(event: MouseEvent){
    const cartDropdown = this.elementRef.nativeElement.querySelector('.cart-dropdown');

  }

get filteredProducts() {
  const filter = this.filterText.trim().toLowerCase();
  if (!filter) return this.products;
  return this.products.filter(
    p =>
      p.name.toLowerCase().includes(filter) ||
      p.category.toLowerCase().includes(filter)
  );
}

  addQuantity(product: any){
    product.quantity= (product.quantity || 0) + 1;
  }

  removeQuantity(product: any){
    if(product.quantity && product.quantity > 0){
      product.quantity--;
    }
  }

  get totalquantity(){
    return this.products.reduce((sum, p) => sum + (p.quantity || 0), 0);
  }

  get cartProducts(){
    return this.products.filter(p => p.quantity > 0);
  }

  get paginatedProducts() {
    const start = (this.page - 1) * this.pageSize;
    return this.filteredProducts.slice(start, start + this.pageSize);
  }

  nextPage() {
    if ((this.page * this.pageSize) < this.products.length) {
      this.page++;
    }
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
    }
  }
}