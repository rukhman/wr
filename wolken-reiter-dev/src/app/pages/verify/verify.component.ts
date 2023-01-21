import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth.service';
import { verifyEmail } from 'src/app/store/auth-store/auth.actions';

@Component({
  selector: 'app-not-found',
  template: `
    <p class="not-found">
      <b>
        {{ message }}
      </b>
    </p>
  `,
  styles: [`
  .not-found {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
    width:100vw;
    height:100vh;
    top: 0;
    left: 0;
    font-size: 5vw;
    background: linear-gradient(to bottom right, #1D1A1A, #51514E);
  }

  `]
})
export class VerifyComponent implements OnInit {
  message: string = "Please wait..."

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private store: Store) {}

  ngOnInit(): void {
    const token = this.route.snapshot.params?.['token']
    if(!token) {
      this.showError()
      return
    }
    this.auth.verifyEmail(token).subscribe(
    (response) => {
      this.store.dispatch(verifyEmail({ verified: response.verified }))
      this.router.navigate(["/"])
    },
    () => {
      this.showError()
    })
  }

  showError(): void {
    this.message = "Oops, an error has occurred"
    this.auth.logout()
    setTimeout(() => {
      this.router.navigate(["/"])
    }, 2000)
  }

}
