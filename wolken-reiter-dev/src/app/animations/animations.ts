import { trigger, style, transition, animate, query } from '@angular/animations';

export enum AnimationRoutingNames {
  MAIN_PAGE = "mainPage",
  LOGIN = "login",
  SIGNUP = "signup",
  FAVORITE = "favorite",
  CART = "cart",
  NEW_PRODUCT = "newProduct",
  ABOUT = "about",
  CONTACTS = "contacts",
}

export const animations = {
  animOpacity: trigger('animOpacity', [
    transition(':enter', [
      style({ opacity: 0 }),
      animate('.4s', style({ opacity: 1 })),
    ]),
    transition(':leave', [
      animate('.4s', style({ opacity: 0 })),
    ]),
  ])
}

export const routeChangeAnimation = trigger(
  'routeChangeAnimation',
  [
    transition('* => *', [
      query(
        ':enter',
        [style({ opacity: 0, height: "0%" })],
        { optional: true }
      ),
      query(
        ':leave',
         [style({
           opacity: 1,
           }), animate('1s 0.2s ease', style({ opacity: 0, height: "0%" }))],
        { optional: true }
      ),
      query(
        ':enter',
        [style({
          opacity: 0,
          position: 'absolute'
         }), animate('1s 0.2s ease', style({ opacity: 1, height: "79%" }))],
        { optional: true }
      )
    ])
  ]
)

