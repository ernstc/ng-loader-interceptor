import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1>Welcome to {{title}}!</h1>
    <app-loader></app-loader>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
  title = 'loader-interceptor';
}
