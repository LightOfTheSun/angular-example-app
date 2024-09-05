import { Component, computed, inject } from '@angular/core';
import { NgbToast, NgbToastHeader } from '@ng-bootstrap/ng-bootstrap';
import { AlertsService } from '../../services/alerts.service';

@Component({
  selector: 'app-alerts',
  standalone: true,
  imports: [NgbToast, NgbToastHeader],
  templateUrl: './alerts.component.html'
})
export class AlertsComponent {
  readonly alertsService = inject(AlertsService);

  alerts = computed(() => this.alertsService.alerts().reverse());

}
