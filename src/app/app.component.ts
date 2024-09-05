import { Component, effect, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CoreService } from './shared/services/core.service';
import { ScrollTrackerDirective } from './shared/directives/scroll-tracker.directive';
import { AlertsComponent } from './shared/components/alerts/alerts.component';
import { NavBarComponent } from './features/nav-bar/nav-bar.component';
import { FooterComponent } from './features/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ScrollTrackerDirective, AlertsComponent, NavBarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  isScrolled = signal(true);
  private readonly coreService = inject(CoreService);

  constructor() {
    effect(() => document.body.className = this.coreService.theme());
  }

  // @HostBinding("class") get themeClass() {
  //   return this.uiService.theme();
  // }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  handleScrolling(position: number) {
    if (position === 0)
      this.isScrolled.set(true);
    else
      this.isScrolled.set(false);
  }
}
