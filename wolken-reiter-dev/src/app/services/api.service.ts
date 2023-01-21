import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, share } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EditProduct, Languages, Product } from '../shared/types/types';
import { changeCartState, changeFavoriteState } from '../store/auth-store/auth.actions';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public baseUrl = environment.baseUrl;
  languageFormControl: FormControl = new FormControl(Languages.EN)

  constructor(private http: HttpClient, private store: Store, private router: Router, private auth: AuthService) {}

  getFavoriteState(): Observable<any> {
    const url = this.baseUrl +  "/favorite";
    return this.http.get<any>(url)
  }

  getCartState(): Observable<any> {
    const url = this.baseUrl +  "/cart";
    return this.http.get<any>(url)
  }

  sendNewFavoriteElement(id: number): Observable<any> {
    const url = this.baseUrl +  "/favorite";
    return this.http.post<any>(url, { product: id })
  }

  sendNewCartElement(id: number): Observable<any> {
    const url = this.baseUrl +  "/cart";
    return this.http.post<any>(url, { product: id })
  }

  deleteFavoriteElement(id: number): Observable<any> {
    const url = this.baseUrl +  "/favorite";
    let params = new HttpParams();
    params = params.set("product", id)
    return this.http.delete<any>(url, { params })
  }

  deleteCartElement(id: number): Observable<any> {
    const url = this.baseUrl +  "/cart";
    let params = new HttpParams();
    params = params.set("product", id)
    return this.http.delete<any>(url, { params })
  }

  addNewProduct(body: Product): Observable<Product> {
    const url = this.baseUrl +  "/create-new-product"
    return this.http.post<Product>(url, body)
  }

  getProducts(): Observable<Array<Product>> {
    const url = this.baseUrl + "/products"
    return this.http.get<Array<Product>>(url)
  }

  getDialogConfig(text: string, confirmText?: string, rejectText?: string, width = "30%"): any {
    return confirmText && confirmText ?
    {
      height: "25%",
      width,
      data: {
        text,
        confirmText,
        rejectText
      }
    }:
    {
       height: "25%",
       width: "30%",
       data: {
         text
       }
     }
   }

   changeFavoriteState(product: Product): void {
    if (this.auth.authorized) {
      this.store.dispatch(changeFavoriteState({ product }))
    } else {
      this.router.navigate(["/", "login"])
    }
  }

  changeCartState(product: Product): void {
    if (this.auth.authorized) {
      this.store.dispatch(changeCartState({ product }))
    } else {
      this.router.navigate(["/", "login"])
    }
  }

  deleteProduct(id: number): Observable<Product> {
    const url = this.baseUrl +  "/delete-product";
    let params = new HttpParams();
    params = params.set("product", id)
    return this.http.delete<Product>(url, { params })
  }

  editProduct(body: EditProduct): Observable<EditProduct> {
    const url = this.baseUrl +  "/edit-product"
    let params = new HttpParams();
    params = params.set("product", body.id)
    return this.http.put<EditProduct>(url, body)
  }
}
