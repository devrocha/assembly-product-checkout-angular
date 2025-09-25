import { Component, OnInit } from '@angular/core';
import { Products, IProduct } from '../../services/products';

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{

  cartProducts: IProduct[] = [];
  constructor(private productsService: Products){}

  ngOnInit(){
    this.cartProducts = this.productsService.getProducts().filter(p => p.quantity > 0);
  }

  addQuantity(product: IProduct){
    product.quantity++;
  }

  removeQuantity(product: IProduct){
    if(product.quantity > 0){
      product.quantity--;
    }
  }
}
