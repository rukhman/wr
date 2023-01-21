import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCartCardComponent } from './product-cart-card.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ProductCartCardComponent
  ],
  imports: [
    CommonModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  exports: [
    ProductCartCardComponent
  ],
})
export class ProductCartCardModule { }
