import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwiperComponent } from './swiper.component';
import { SwiperModule } from 'swiper/angular';



@NgModule({
  declarations: [
    SwiperComponent
  ],
  imports: [
    CommonModule,
    SwiperModule
  ],
  exports: [
    SwiperComponent
  ],
})
export class SwiperSlideModule { }
