import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  template: `
    <p class="not-found">
      <b>
        404
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
export class NotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
