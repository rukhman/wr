import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogComponent } from './catalog.component';
import { ProductCardModule } from 'src/app/shared/components/product-card/product-card/product-card.module';

@NgModule({
  declarations: [
    CatalogComponent,
  ],
  imports: [
    ProductCardModule,
    CommonModule,
  ]
})
export class CatalogModule { }
