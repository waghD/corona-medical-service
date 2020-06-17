// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiHost: 'http://localhost:3000',
  apiEndpoint: '/api',
  firebaseConfig: {
    apiKey: 'AIzaSyDWP2p8lDdsNHQShkrixeRmJQaaZI2GI3w',
    authDomain: 'corona-medical-service.firebaseapp.com',
    databaseURL: 'https://corona-medical-service.firebaseio.com',
    projectId: 'corona-medical-service',
    storageBucket: 'corona-medical-service.appspot.com',
    messagingSenderId: '26108789022',
    appId: '1:26108789022:web:04d55a7deac373232f890f',
    measurementId: 'G-JRGSRYGRE2',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
