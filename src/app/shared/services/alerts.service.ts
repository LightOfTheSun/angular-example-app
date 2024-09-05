import { Injectable, signal } from '@angular/core';
import { IAlertModel } from '../models/alert.model';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {
  alerts = signal<IAlertModel[]>([]);
  private _lastId = signal(0);

  addSuccess(alert: IAlertModel) {
    this.alerts.update((alerts) => ([
      ...alerts,
      { ...alert, classname: 'bg-success text-light', type: 'success', id: this._lastId() + 1 }
    ]));
    this._lastId.update((id) => id + 1);
  }

  addError(alert: IAlertModel) {
    this.alerts.update((alerts) => ([
      ...alerts,
      { ...alert, classname: 'bg-danger text-light', type: 'error', id: this._lastId() + 1 }
    ]));
  }

  remove(toast: IAlertModel) {
    this.alerts.update((alerts) => alerts.filter(t => t.id !== toast.id));
  }

}
