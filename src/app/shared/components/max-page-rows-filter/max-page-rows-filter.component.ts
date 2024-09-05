import { Component, model, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-max-page-rows-filter',
  templateUrl: './max-page-rows-filter.component.html',
  standalone: true,
  imports: [FormsModule]
})
export class MaxPageRowsFilterComponent {
  readonly maxRowsPerPage = model<number>(30);
  readonly maxRowsPerPageChange = output<number>();
  protected readonly maxRowsPerPageOld = signal<number>(30);

  updateMaxRows() {
    if (this.maxRowsPerPage() === this.maxRowsPerPageOld()) return;

    if (this.maxRowsPerPage() <= 0) {
      this.maxRowsPerPage.set(1);
    }

    this.maxRowsPerPageOld.set(this.maxRowsPerPage());

    this.maxRowsPerPageChange.emit(this.maxRowsPerPage());
  }
}
