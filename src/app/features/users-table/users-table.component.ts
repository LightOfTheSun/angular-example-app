import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { SlicePipe } from '@angular/common';
import { LoadingBarComponent } from '../../shared/components/loading-bar/loading-bar.component';
import {
  MaxPageRowsFilterComponent
} from '../../shared/components/max-page-rows-filter/max-page-rows-filter.component';
import { PaginationPipe } from '../../shared/pipes/pagination.pipe';
import { TableService } from './services/table.service';
import { TValue } from './models/table.models';
import { ModalService } from '../../shared/services/modal.service';
import { IFilter, IFilterData } from './models/filter.models';
import { BasicFilterComponent } from './ui/modal-filter/basic-filter.component';
import { ApiService } from '../../shared/services/api.service';
import { finalize, take } from 'rxjs';
import { AlertsService } from '../../shared/services/alerts.service';

@Component({
  selector: 'app-users-table',
  standalone: true,
  imports: [
    LoadingBarComponent,
    NgbPagination,
    SlicePipe,
    PaginationPipe,
    MaxPageRowsFilterComponent,
    LoadingBarComponent,
    MaxPageRowsFilterComponent,
    PaginationPipe
  ],
  templateUrl: './users-table.component.html',
  styles: ['td { min-width: 100px; }'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersTableComponent implements OnInit {
  loading = signal<boolean>(false);
  private modalService = inject(ModalService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly usersTableService = inject(TableService);
  data = computed(() => this.usersTableService.data());
  dataLength = computed(() => this.data().length);
  header = computed(() => this.data().length ? Object.keys(this.data()[0]) : []);
  filteredData = computed(() => this.usersTableService.filteredData());
  filteredDataLength = computed(() => this.usersTableService.filteredData().length);
  rowsPerPage = this.usersTableService.rowsPerPage;
  page = this.usersTableService.page;
  private readonly apiService = inject(ApiService);
  private readonly alertsService = inject(AlertsService);

  ngOnInit() {
    this.loadData();
  }

  openFilter(col: string) {
    this.modalService.runModalComponent$<{ data: IFilterData, values: TValue[] }, BasicFilterComponent, {
      filter?: IFilter,
      sorting?: boolean
    }>(
      { data: this.usersTableService.filtersInfo(col), values: this.data().map((row) => row[col]) },
      BasicFilterComponent,
      { centered: true, scrollable: true, size: 'lg' }
    )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((newFilters) => this.usersTableService.applyFilters(col, newFilters));
  }

  isFilterApplied(key: string) {
    return Boolean(
      this.usersTableService.sortingFilters().filter((value) => value.col === key).length ||
      this.usersTableService.filters().filter((value) => value.col === key).length
    );
  }

  clearFilter(key: string) {
    this.usersTableService.clearFilter(key);
  }

  isNumber(value: TValue) {
    return typeof value === 'number';
  }

  isLink(value: TValue) {
    return typeof value === 'string' && value.startsWith('http');
  }

  private loadData() {
    this.loading.set(true);
    this.apiService.getUsersData$()
      .pipe(take(1), takeUntilDestroyed(this.destroyRef), finalize(() => this.loading.set(false)))
      .subscribe({
        next: (data) => this.usersTableService.setData(data),
        error: () => this.alertsService.addError({ msg: 'Failed to load data' })
      });
  }
}
