import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { authReducer, AUTH_FEATURE_NAME } from './auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffect } from './auth.effect';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(AUTH_FEATURE_NAME, authReducer),
    EffectsModule.forFeature([AuthEffect])
  ]
})
export class AuthStoreModule { }
