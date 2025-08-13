import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <nav>
      <a routerLink="/">Home</a> |
      <a routerLink="/mock">Mock Test</a> |
      <a routerLink="/usuarios">CRUD</a>
    </nav>
    <router-outlet></router-outlet>
  `
})
export class App {}
