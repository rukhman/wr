import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProductComponent } from './add-product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PreviewGalleryModule } from 'preview-gallery';
import { AppAddProductRoutingModule } from './add-product-routing.module';
@NgModule({
  declarations: [AddProductComponent],
  exports: [AddProductComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    PreviewGalleryModule,
    AppAddProductRoutingModule
  ]
})
export class AddProductModule { }
