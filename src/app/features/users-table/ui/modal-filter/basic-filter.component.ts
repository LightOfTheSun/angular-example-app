import { Component, computed, inject, input, model, OnInit, signal } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgIf } from '@angular/common';
import { SwitchCheckboxComponent } from '../../../../shared/components/switch-checkbox/switch-checkbox.component';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { TValue } from '../../models/table.models';
import { IFilter, IFilterData } from '../../models/filter.models';
import { patchSignal } from '../../../../shared/utils/helper.utils';


@Component({
  selector: 'app-basic-filter',
  templateUrl: './basic-filter.component.html',
  standalone: true,
  imports: [
    NgIf,
    SwitchCheckboxComponent,
    InputComponent
  ]
})
export class BasicFilterComponent implements OnInit {
  readonly activeModal = inject(NgbActiveModal);

  readonly filterTypes = {
    empty: 'empty',
    includes: 'includes',
    startsWith: 'starts with',
    endsWith: 'ends with',
    eq: '=',
    le: '<=',
    ge: '>=',
    less: '<',
    greater: '>'
  };

  data = model.required<IFilterData>();
  values = input<TValue[]>([]);
  selectedValues = signal<string[]>([]);

  selected = signal('');

  dataToSendBack = computed(() => ({
    filter: this.selected() || this.selectedValues().length ? {
      ...this.data().filter,
      in: this.selectedValues()
    } : undefined,
    sorting: this.data().sorting
  }));

  ngOnInit(): void {
    this.setSelected();
  }

  selectFilter(filterType: string, newSelectedType?: number | string | boolean) {
    const filter = { ...this.data().filter };
    switch (this.selected()) {
      case this.filterTypes.empty:
        filter.empty = false;
        break;
      case this.filterTypes.includes:
        delete filter.includes;
        break;
      case this.filterTypes.startsWith:
        delete filter.startsWith;
        break;
      case this.filterTypes.endsWith:
        delete filter.endsWith;
        break;
      case this.filterTypes.eq:
        delete filter.eq;
        break;
      case this.filterTypes.le:
        delete filter.le;
        break;
      case this.filterTypes.ge:
        delete filter.ge;
        break;
      case this.filterTypes.less:
        delete filter.less;
        break;
      case this.filterTypes.greater:
        delete filter.greater;
        break;
    }
    this.data.update((data) => ({ ...data, filter }));
    this.selected.set(newSelectedType ? filterType : '');
  }

  selectSorting(ascending: boolean | undefined) {
    this.data.update((data) => ({ ...data, sorting: ascending }));
  }

  updateFilter(filter: Partial<IFilter>) {
    patchSignal(this.data, { filter: { ...this.data().filter, ...filter } });
  }

  private setSelected() {
    const {
      empty,
      includes,
      startsWith,
      endsWith,
      eq,
      le,
      ge,
      less,
      greater
    } = this.data().filter;

    if (empty)
      this.selected.set(this.filterTypes.empty);
    if (includes)
      this.selected.set(this.filterTypes.includes);
    if (startsWith)
      this.selected.set(this.filterTypes.startsWith);
    if (endsWith)
      this.selected.set(this.filterTypes.endsWith);
    if (eq)
      this.selected.set(this.filterTypes.eq);
    if (le)
      this.selected.set(this.filterTypes.le);
    if (ge)
      this.selected.set(this.filterTypes.ge);
    if (less)
      this.selected.set(this.filterTypes.less);
    if (greater)
      this.selected.set(this.filterTypes.greater);
  }
}
