import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavoriteRoutingModule } from './favorite-routing.module';
import { FavoriteComponent } from './favorite.component';
import { ProductCardModule } from 'src/app/shared/components/product-card/product-card/product-card.module';


@NgModule({
  declarations: [
    FavoriteComponent
  ],
  imports: [
    CommonModule,
    FavoriteRoutingModule,
    ProductCardModule
  ],
  exports: [
    FavoriteComponent
  ],
})
export class FavoriteModule { }
