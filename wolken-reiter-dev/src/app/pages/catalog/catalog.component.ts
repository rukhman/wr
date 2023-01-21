import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { Product } from 'src/app/shared/types/types';

@Component({
  selector: 'app-catalog',
  template: `
  <div class="product-container">
    <ng-container *ngIf="products$ | async as products">
      <div *ngFor="let product of products" class="product-wrap">
        <app-product-card
          class="productCard"
          [product]="product"
          [images]="product.images"
        ></app-product-card>
      </div>
    </ng-container>
  </div>
  `,
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit {
  products$!: Observable<Product[]>;
  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.products$ = this.api.getProducts();
  }
}
