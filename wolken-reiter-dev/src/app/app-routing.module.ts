import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimationRoutingNames } from './animations/animations';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { VerifyComponent } from './pages/verify/verify.component';
import { AddProductComponent } from './shared/components/add-product/add-product.component';

const routes: Routes = [
  {
    path: "",
    component: CatalogComponent,
    data: { animation: AnimationRoutingNames.MAIN_PAGE }
  },
  {
    path: "login",
    loadChildren: () =>
      import("./pages/login/login.module").then(m => m.LoginModule)
  },
  {
    path: "about",
    loadChildren: () => import("./pages/about/about.module").then(m => m.AboutModule)
  },
  {
    path: "contacts",
    loadChildren: () => import("./pages/contacts/contacts.module").then(m => m.ContactsModule)
  },
  {
    path: "signup",
    loadChildren: () => import("./pages/signup/signup.module")
    .then(m => m.SignupModule)
  },
  {
    path: "favorite",
    loadChildren: () => import("./pages/favorite/favorite.module").then(m => m.FavoriteModule)
  },
  {
    path: "cart",
    loadChildren: () => import("./pages/cart/cart.module").then(m => m.CartModule)
  },
  {
    path: "verify/:token",
    component: VerifyComponent,
  },
  {
    path: "add-product",
    loadChildren: () => import("./shared/components/add-product/add-product.module").then(m => m.AddProductModule)
  },
  {
    path: "**",
    component: NotFoundComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }],
  exports: [RouterModule]
})
export class AppRoutingModule { }
