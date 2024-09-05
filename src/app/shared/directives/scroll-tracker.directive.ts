import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[scrollTracker]',
  standalone: true
})
export class ScrollTrackerDirective {
  @Output() scrollPosition = new EventEmitter<number>();

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.scrollPosition.emit(scrollPosition);
  }

}
