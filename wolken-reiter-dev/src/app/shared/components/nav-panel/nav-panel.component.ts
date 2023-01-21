import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { map, Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { getCartState, getFavoriteState } from 'src/app/store/auth-store/auth.selectors';
import { Languages } from '../../types/types';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-nav-panel',
  templateUrl: './nav-panel.component.html',
  styleUrls: ['./nav-panel.component.scss']
})
export class NavPanelComponent implements OnInit {
  @Input() isCompact = false;
  inFavorite$!: Observable<(number | undefined)[]>;
  inCart$!:Observable<(number | undefined)[]>;
  verified: boolean = false;
  languages = Languages

  constructor(
    private store: Store,
    public authService: AuthService,
    private dialog: MatDialog,
    public api: ApiService,
    public translate: TranslateService,
    ) { }

  ngOnInit(): void {
    this.inFavorite$ = this.getFavoriteState();
    this.inCart$ = this.getCartState();
  }

  getFavoriteState(): Observable<(number | undefined)[]> {
    return this.store.pipe(
      select(getFavoriteState),
    ).pipe(map((array) => array.map((item => item.id))))
  }

  getCartState(): Observable<(number | undefined)[]> {
    return this.store.pipe(
      select(getCartState),
    ).pipe(map((array) => array.map((item => item.id))))
  }

  openDialog() {
    if(!this.authService.email) return
    let config = this.api.getDialogConfig(`Please check your email: ${this.authService.email}`)
    this.dialog.open(DialogComponent, config)
  }
}
