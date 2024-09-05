import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoreService {
  theme = signal<'light' | 'dark'>('light');

  // for testing
  isLoggedIn = signal<boolean>(false);

  constructor() {
    this.theme.set(localStorage.getItem('theme') as 'light' | 'dark' || 'light');
  }

  toggleTheme() {
    this.theme.update((theme) => (theme === 'light' ? 'dark' : 'light'));
    localStorage.setItem('theme', this.theme());
  }
}
