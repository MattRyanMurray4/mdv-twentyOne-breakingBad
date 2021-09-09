import { Component } from '@angular/core';

@Component({
  selector: 'breakingbad-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Breaking Bad';
  links = [
    { path: '/', icon: 'home', title: 'Login' },
    { path: 'characters', icon: 'view_list', title: 'Characters' },
  ];
}
