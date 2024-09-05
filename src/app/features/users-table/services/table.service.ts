import { computed, Injectable, signal } from '@angular/core';
import { TRow, TTable } from '../models/table.models';
import { IFilter, IFilterData, ISortingFilter } from '../models/filter.models';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  readonly data = signal<TTable>([]);

  readonly filters = signal<{ col: string; filter: IFilter }[]>([]);
  readonly sortingFilters = signal<{ col: string; ascending: boolean }[]>([]);

  readonly filteredData = computed(() => {
    return this.sortData(
      this.filterData(this.data().slice(), this.filters()),
      this.sortingFilters()
    );
  });

  readonly page = signal<number>(1);
  readonly rowsPerPage = signal<number>(30);

  sortData(data: TTable, sortingFilters: ISortingFilter[]) {
    for (let filter of sortingFilters) {
      data.sort((a, b) => {
        const aVal = a[filter.col];
        const bVal = b[filter.col];

        if (!aVal) return filter.ascending ? -1 : 1;
        if (!bVal) return filter.ascending ? 1 : -1;

        if (aVal > bVal) return filter.ascending ? 1 : -1;
        if (aVal < bVal) return filter.ascending ? -1 : 1;

        return 0;
      });
    }

    return data;
  }

  filterData(data: TTable, filters: { col: string; filter: IFilter }[]) {
    for (let filterInfo of filters) {
      const { col, filter } = filterInfo;
      const { not, empty, includes, startsWith, endsWith, eq, le, ge, less, greater } = filter;

      if (empty) {
        const conditionIsTrue = (value: TRow) => !value[col];
        data = data.filter((value) => (not ? !conditionIsTrue(value) : conditionIsTrue(value)));
        continue;
      }

      if (includes) {
        const conditionIsTrue = (value: TRow) => String(value[col]).toLowerCase().includes(includes.toLowerCase());
        data = data.filter((value) => (not ? !conditionIsTrue(value) : conditionIsTrue(value)));
      }
      if (startsWith) {
        const conditionIsTrue = (value: TRow) => String(value[col]).toLowerCase().startsWith(startsWith.toLowerCase());
        data = data.filter((value) => (not ? !conditionIsTrue(value) : conditionIsTrue(value)));
      }
      if (endsWith) {
        const conditionIsTrue = (value: TRow) => String(value[col]).toLowerCase().endsWith(endsWith.toLowerCase());
        data = data.filter((value) => (not ? !conditionIsTrue(value) : conditionIsTrue(value)));
      }
      if (eq) {
        const conditionIsTrue = (value: TRow) => value[col] == eq;
        data = data.filter((value) => (not ? !conditionIsTrue(value) : conditionIsTrue(value)));
      }

      if (le) {
        data = data.filter((value) => typeof value[col] === 'number' && value[col] <= le);
      }
      if (ge) {
        data = data.filter((value) => typeof value[col] === 'number' && value[col] >= ge);
      }
      if (less) {
        data = data.filter((value) => typeof value[col] === 'number' && value[col] < less);
      }
      if (greater) {
        data = data.filter((value) => typeof value[col] === 'number' && value[col] > greater);
      }
    }

    return data;
  }

  filtersInfo(col: string): IFilterData {
    const colFilters = this.filters()
      .filter(value => value.col === col)
      .map(value => value.filter);

    const colSorting = this.sortingFilters()
      .filter(value => value.col === col)
      .map(value => value.ascending);

    return {
      col,
      filterType: this.getColumnDataType(this.data(), col),
      filter: colFilters.length ? colFilters[0] : { not: false, empty: false },
      sorting: colSorting.length ? colSorting[0] : undefined
    };
  }

  applyFilters(col: string, filters?: { filter?: IFilter, sorting?: boolean }) {
    if (!filters) return;

    const { filter, sorting } = filters;

    this.filters.update((filters) => {
      filters = filters.filter((value) => value.col !== col);
      if (filter)
        filters.push({ col, filter });
      return filters;
    });

    this.sortingFilters.update((sortingFilters) => {
      sortingFilters = sortingFilters.filter(value => value.col !== col);
      if (sorting !== undefined)
        sortingFilters.push({ col, ascending: sorting });
      return sortingFilters;
    });
  }

  clearFilter(key: string) {
    this.filters.update((filters) => filters.filter((value) => value.col !== key));
    this.sortingFilters.update((sortingFilters) => sortingFilters.filter((value) => value.col !== key));
  }

  setData(data: TTable) {
    this.data.set(data);
  }

  private getColumnDataType(data: TTable, col: string) {
    if (data.length === 0) return 'undefined';

    const allTypes = [...new Set(data.map((value) => typeof value[col]))];
    return allTypes.length === 1 ? allTypes[0] : 'mixed';
  }
}
