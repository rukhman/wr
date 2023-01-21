import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginComponent } from '../pages/login/login.component';
import { SignupComponent } from '../pages/signup/signup.component';

@Injectable({
  providedIn: 'root'
})
export class MainDeactivateGuard implements CanDeactivate<unknown> {
  canDeactivate(
    component: SignupComponent | LoginComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(!component?.checkoutForm?.pristine) return window.confirm("Are you sure you want to leave the page? The data will be lost.")
    return true;
  }

}
