import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [RouterModule, CommonModule],
  standalone: true,
  templateUrl: './cart.html',

})
export class Cart {
cartProducts: any;
produto: any;

}
