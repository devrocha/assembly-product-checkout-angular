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

}
