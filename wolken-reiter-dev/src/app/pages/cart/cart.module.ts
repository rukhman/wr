import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';
import { ProductCartCardModule } from 'src/app/shared/components/product-cart-card/product-cart-card.module';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    ProductCartCardModule,
    MatButtonModule
  ],
  exports: [
    CartComponent
  ],
})
export class CartModule { }
