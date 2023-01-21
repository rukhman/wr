import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NotFoundModule } from './pages/not-found/not-found.module';
import { NavComponent } from './layouts/layout-first/nav.component';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { appStateReducer, ROOT_FEATURE_NAME } from './store/root-store/store/root.reducer';
import { BreakpointWidthDirective } from './shared/directives/breakpoint-width.directive';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthStoreModule } from './store/auth-store/auth-store.module';
import { VerifyModule } from './pages/verify/verify.module';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from './shared/components/dialog/dialog.component';
import { CatalogModule } from './pages/catalog/catalog.module';
import { NavPanelModule } from './shared/components/nav-panel/nav-panel.module';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmWindowComponent } from './shared/components/confirm-window/confirm-window.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MatMenuModule } from '@angular/material/menu';
import { TokensInterceptor } from './interceptors/tokens.interceptor';
import { CachingInterceptor } from './interceptors/caching.interceptor';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    BreakpointWidthDirective,
    DialogComponent,
    ConfirmWindowComponent,
  ],
  imports: [
    MatSliderModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    CatalogModule,
    NotFoundModule,
    StoreModule.forRoot({[ROOT_FEATURE_NAME]: appStateReducer}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    StoreDevtoolsModule.instrument({name: 'my NgRx'}),
    EffectsModule.forRoot([]),
    HttpClientModule,
    AuthStoreModule,
    VerifyModule,
    MatDialogModule,
    NavPanelModule,
    MatBadgeModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatMenuModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      },
      defaultLanguage: "en",
  })
  ],
  entryComponents: [DialogComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokensInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CachingInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
