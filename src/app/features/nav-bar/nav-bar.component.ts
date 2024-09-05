import { Component, computed, ElementRef, inject, TemplateRef, ViewChild } from '@angular/core';
import { NgOptimizedImage, NgTemplateOutlet } from '@angular/common';
import { NgbModal, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthModalComponent } from '../auth-modal/auth-modal.component';
import { CoreService } from '../../shared/services/core.service';
import { ILinkModel } from './models/link.model';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    RouterLink,
    NgOptimizedImage,
    RouterLinkActive,
    NgTemplateOutlet
  ],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  readonly offCanvasService = inject(NgbOffcanvas);
  readonly links: ILinkModel[] = [
    { title: 'Home', path: '/' },
    { title: 'Users table', path: '/users-table' }
    // { title: 'FAQ', path: '/faq' },
    // { title: 'Support', path: '/support' }
  ];
  @ViewChild('offCanvasNavbar', { static: true }) offcanvasTemplate!: ElementRef;
  private readonly modalService = inject(NgbModal);
  private readonly coreService = inject(CoreService);
  theme = computed(() => this.coreService.theme() + '-theme');
  isLoggedIn = this.coreService.isLoggedIn;

  toggleTheme() {
    this.coreService.toggleTheme();
  }

  openOffCanvas<T>(template: TemplateRef<T>) {
    this.offCanvasService.open(template, {
      panelClass: 'offcanvas-mobile',
      position: 'end'
    });
  }

  openAuth() {
    this.modalService.open(AuthModalComponent, {
      centered: true,
      size: 'lg',
      fullscreen: 'sm'
    });
  }

  logout() {
    // TODO: Implement logout
    this.coreService.isLoggedIn.set(false);
  }
}
