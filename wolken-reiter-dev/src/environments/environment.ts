// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: 'http://localhost:8000',
  // baseUrl: 'https://wr-back.herokuapp.com',
  contentful: {
    spaceId: '5n5pcoqyb97y',
    accessTokenDelivery: 'A7ohRahkpDP-tjxzqWKG8cACFyZV8oFr_eTLDEwg2jk',
    accessTokenPreview: 'aa0TGv9o8WZhRcawMXo41boeuRd1l6ob9Ko9WvcCFn4',
    firstAccessToken: 'CFPAT-MPJiY70A5ZyR6PzJe0n5x3TssOUYVLXXLmJ6AMIpQ_I',
    contentfulEnviroment: 'master'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
