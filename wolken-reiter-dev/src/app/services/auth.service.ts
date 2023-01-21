import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { catchError, map, mergeMap, Observable, of, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DialogComponent } from '../shared/components/dialog/dialog.component';
import {
   AccessTokenData,
   Email,
   EmailExistsResponse,
   EmailNotExistsResponse,
   jwtData,
   LoginData,
   SignupData,
   Token,
   UserCreatedResponse,
   UserData
  } from '../shared/types/types';
import { logout, saveToken } from '../store/auth-store/auth.actions';
import { getAccessToken, getAuthData } from '../store/auth-store/auth.selectors';
import { getVisitorId } from '../store/root-store/store/root.selectors';
import { saveVisitorId } from '../store/root-store/store/root.actions';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private helper = new JwtHelperService();
  private accessToken: string | null = null;
  public accessTokenLifeTime: Date | null = null;
  public baseUrl = environment.baseUrl;
  public serverError: "login" | "password" | "signup" | null = null;
  protected refresh = new Subject();


  public role!: string | undefined;
  public authorized: boolean = false;
  public name!: string | undefined;
  public email!: string | undefined;
  public surname!: string | undefined;
  public id!: number | undefined;

  constructor(private http: HttpClient, private store: Store, private dialog: MatDialog) {
    this.subscribeStoreAuthData()
  }

  subscribeStoreAuthData(): void {
    this.store.pipe(select(getAuthData)).subscribe(data => {
      const user = data?.userData
      this.name = user?.name
      this.id = user?.id
      this.email = user?.email
      this.surname = user?.surname
      this.role = user?.role
      this.authorized = (!!data?.accessToken?.accessToken && !!user?.name && !!user?.email && !!user?.surname && !!user?.role)
    })
  }
  
  createUser = (user: SignupData): Observable<UserCreatedResponse> => {
    const url = this.baseUrl +  "/signup"
    return this.http.post<UserCreatedResponse>(url, user)
  }

  /**
   * отправляем email и пароль, получаем токены
   */
  login = (data: LoginData): Observable<jwtData> => {
    let headers = new HttpHeaders()
    const url = this.baseUrl +  "/login"
    return this.store.pipe(
      select(getVisitorId),
      mergeMap((visitorId) => {
        if(!visitorId) return of()
        headers = headers.set("visitor-id", visitorId)
        return this.http.post<jwtData>(url, data, {
          headers
        })
      })
    )
  }

  getUserData = (): Observable<UserData> => {
    const url = this.baseUrl + "/user"
    return this.http.get<UserData>(url)
  }

  logout = (): void => {
    localStorage.removeItem("__refreshToken")
    this.store.dispatch(logout())
  }

  getToken(): string | null {
    return this.accessToken
  }

  getTokenLifetime(): Date | null {
    return this.accessTokenLifeTime
  }

  saveTokens(resp: jwtData | undefined): void {
    if(resp) {
      const tokenData = resp?.accessTokenData
      const token = tokenData?.accessToken
      const refreshToken = resp?.refreshToken
      if(!token) return
      this.accessToken = token
      this.accessTokenLifeTime = tokenData.expiresAt
      localStorage.setItem("__refreshToken", JSON.stringify(refreshToken))
      this.store.dispatch(saveToken({ accessToken: tokenData }))
    }
  }


  sendLoginForm(form: LoginData): Observable<any> {
    return this.login(form)
    .pipe(
      map((resp: jwtData | undefined) => {
        this.saveTokens(resp)
      }),
      catchError((err) => {
      this.serverError = err.error.type
      return new Observable()
      }),
    )
  }

  sendSignupForm(form: SignupData): any{
    return this.createUser(form)
    .pipe(
      mergeMap((resp: UserCreatedResponse | undefined) => {
        if(resp?.userCreated) {
          const data = {
            email: form.email,
            password: form.passwordGroup.password,
          }
          this.sendLoginForm(data)
        }
        return new Observable()
      }),
      catchError((err) => {
      this.openDialog("An error occurred during registration.")
      this.serverError = err.error.type
      return new Observable()
      }
    ))
  }

  openDialog(text: string): void {
    let config = this.getDialogConfig(text)
    this.dialog.open(DialogComponent, config)
  }

  checkEmail = (email: string): Observable<EmailExistsResponse | EmailNotExistsResponse> => {
    const url = this.baseUrl +  "/check"
    const data: Email = { email }
    return this.http.post<EmailExistsResponse | EmailNotExistsResponse>(url, data)
  }

  getDialogConfig(text: string): any {
    return {
       height: "25%",
       width: "30%",
       data: {
         text
       }
     }
   }

  verifyEmail(token: string): Observable<UserData> {
    const url = this.baseUrl +  "/verify"
    const data: Token = { token }
    return this.http.post<UserData>(url, data)
  }

  saveVisitorId(id: string): void {
    this.store.dispatch(saveVisitorId({ id }))
  }

  /**
   * we call this func by app initialization
   */
  refreshTokens(): Observable<any> {
     return this.refreshLogin().pipe(
      map((resp) => {
        this.saveTokens(resp)
      })
    )
  }

  refreshLogin = (): Observable<jwtData> => {
    const url = this.baseUrl +  "/refresh"
    let headers = new HttpHeaders()
    const refreshToken = localStorage.getItem("__refreshToken")
    // if in localstorage there are not refreshToken, we won`t do anything
    if(!refreshToken) {
      // this.router.navigate([this.baseUrl, "login"]) не корректное поведение
      return of()
    }
    headers = headers.set("refresh-token", refreshToken)
    return this.store.pipe(
      select(getVisitorId),
      mergeMap((visitorId) => {
        if(!visitorId) return of()
        headers = headers.set("visitor-id", visitorId)
        return this.http.get<jwtData>(url, { headers })
      })
    )
  }

  isTokenExpired(): boolean | null {
    if(!this.accessTokenLifeTime) return null
    return this.accessTokenLifeTime < new Date()
  }

  decodeToken(token: any): any {
    return this.helper.decodeToken(token)
  }
}
